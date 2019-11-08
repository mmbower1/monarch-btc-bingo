const express = require('express');
const router = express.Router();
const User = require('../../models/User');
// const auth = require('../../middleware/auth');
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


// get route
router.get('/:forgotToken', async (req, res) => {
    User.findOne({ resetPasswordToken: req.paramas.token, resetPasswordExpires: { $gt: Date.now()} }, () => {
        if (!user) {
            res.json({ msg: 'Password reset token is invalid or expired' });
            // return res.redirect('/forgot')
        }
        res.render('reset', {token: req.params.token})
    })
});

// enter new password and confirm new password
router.post('/:forgotToken', async (req, res) => {
    async.waterfall([
        function(done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now()}}, function(err, user) {
                if (!user) {
                    res.json({ msg: 'Password reset token is invalid or expired' });
                    // return res.redirect('back')
                }
                if (req.body.password === req.body.confirm) {
                    User.setPassword(req.body.password, function(err) {
                        User.resetPasswordToken = undefined;
                        User.resetPasswordExpires = undefined;
                        User.save(function(err) {
                            req.logIn(user, function(err) {
                                done(err, user);
                            })
                        })
                    })
                } else {
                    res.json({ msg: 'Passwords dont match!' });
                    // return res.redirect('back');
                }
            })
        },
        function(user, done) {
            let { email } = req.body;

            const smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'mttbwr91@gmail.com',
                    pass: process.env.GMAILPW
                }
            });
            const mailOptions = {
                to: email,
                from: 'mttbwr91@gmail.com',
                subject: 'Your password has been changed',
                text: 'Hello \n\n' + 'This is a confirmation that the password for your account ' + email + ''
            }
            smtpTransport.sendMail(mailOptions, function(err) {
                res.json({ msg: 'Success! Your password has been changed.' });
                // done(err);
            })
        }
    ], function(err) {
        res.redirect('/login')
    })
});

module.exports = router;