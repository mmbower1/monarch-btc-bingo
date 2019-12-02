const express = require('express');
const router = express.Router();
const User = require('../../models/User');
// const auth = require('../../middleware/auth');
const async = require('async');
const nodemailer = require('nodemailer');
const ErrorResponse = require('../../utils/errorResponse');
const crypto = require('crypto');


// get route
router.get('/:resetToken', async (req, res) => {
    User.findOne({ resetPasswordToken: req.paramas.token, resetPasswordExpires: { $gt: Date.now()} }, () => {
        if (!user) {
            res.json({ msg: 'Password reset token is invalid or expired' });
            // return res.redirect('/forgot')
        }
        res.render('reset', {token: req.params.token})
    })
});

// enter new password and confirm new password
router.put('/:resetToken', async (req, res, next) => {
     // get hashed token
     const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');
     const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now()} })
     if (!user) {
         return next(new ErrorResponse('Invalid token', 400))
     }
     // set new password
     user.password = req.body.password;
     user.resetPasswordToken = undefined;
     user.resetPasswordExpire = undefined;
     await user.save()
     sendTokenResponse(user, 200, res);
});

// helper
// get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // create token
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    res.status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, token });
}

module.exports = router;