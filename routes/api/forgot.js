const express = require('express');
const router = express.Router();
const User = require('../../models/User');
// const auth = require('../../middleware/auth');
const async = require('async');
const nodemailer = require('nodemailer');
const sendEmail = require('../../helpers/sendMail');
const ErrorResponse = require('../../utils/errorResponse');
const crypto = require('crypto');

router.get('/', (req, res, next, err) => {
    res.render('/forgotPassword')
})

// post route for new password email link
router.post('/', async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorResponse('There is no user with that email'), 404)
    }
    // get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false })

    // create reset url msg
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;
    const message = `You are receiving this email because you requested the reset password for Bitcoin Bingo! 
        Please make a PUT request to: \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message
        })
        res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
        console.log(err)
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false })
        return next(new ErrorResponse('Email could not be sent', 500))
    }
})



module.exports = router;