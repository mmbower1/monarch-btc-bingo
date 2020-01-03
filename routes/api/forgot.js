const express = require('express');
const router = express.Router();
const User = require('../../models/User');
// const auth = require('../../middleware/auth');
const sendEmail = require('../../helpers/sendMail');
const { check, validationResult } = require('express-validator');
const ErrorResponse = require('../../utils/errorResponse');
// const crypto = require('crypto');

router.get('/', (req, res, next, err) => {
    res.render('/forgotPassword')
})

// post route for new password email link
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
    ],
    async (req, res, next) => {
        const { email } = req.body;
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(new ErrorResponse('There is no user with that email'), 404)
        }
        // get reset token
        const resetToken = user.getResetPasswordToken();
        console.log(' ');
        console.log('resetToken: ', resetToken);
        await user.save({ validateBeforeSave: false })

        // create reset url msg
        const resetUrl = `${req.protocol}://${req.get('host')}/api/resetPassword/${resetToken}`;
        const message = `You are receiving this email because you requested the reset password for Bitcoin Bingo!
            Please make a PUT request to: \n\n ${resetUrl}`;
        console.log('resetUrl: ', resetUrl);
        console.log(' ');
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