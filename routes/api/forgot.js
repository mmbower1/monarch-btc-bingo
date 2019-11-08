const express = require('express');
const router = express.Router();
const User = require('../../models/User');
// const auth = require('../../middleware/auth');
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

router.get('/', (req, res, next, err) => {
    res.render('/forgotPassword')
})

// post route for new password email link
router.post('/', (req, res, next) => {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                // done(err, token);
            })
        },
        async function(token, done) {
            let { resetPasswordToken, resetPasswordExpires } = req.body;
            let user = await User.findOne({ resetPasswordToken: resetPasswordToken, resetPasswordExpires: resetPasswordExpires });
            // User.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                    res.status(400).json({ error: 'No account with that email exists' });
                }
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000 // 1 hour
                user.save(function(err) {
                    // done(err, token, user);
                })
            // }
        },
        function(token, done) {
            let { email } = req.body;
            const smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'mttbwr91@gmail.com',
                    pass: process.env.GMAILPW
                }
            });
            var mailOptions = {
                to: email,
                from: "mttbwr91@gmail.com",
                subject: "Blockchain Bingo password reset",
                text: 'You requested a password reset. Please click on the following link: ' + 'http://' + req.headers.host 
                    + '/reset/' + token + '\n\n' + 'If you did not request this, please disregard this email.'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                console.log('>>>>', email, ' PASSWORD REQUEST SENT');
                res.json({ msg: 'An email has been sent to ' + email + ' with futher instructions' });
                // done(err, 'done');
            })
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/forgotPassword');
    })
})

module.exports = router;