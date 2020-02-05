const express = require('express');
const router = express.Router();
const config = require('config');
const ErrorResponse = require('../../utils/errorResponse');
const stripe = require('stripe');
const uuid = require('uuid/v4');

router.get('/', (req, res) => {
    res.send(console.log('stripe'));
});

router.post('/', async (req, res, next) => {
    // var error;
    // var status;
    try {
        const body = {
            source: req.body.token.id,
            amount: req.body.amount,
            currency: 'usd'
        }
        stripe.charges.create(body, (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).send({ success: stripeRes })
            }
        })
    } catch (err) {
        // status = "failure"
        return next(new ErrorResponse('Stripe payment could not be sent', 500))
    }
})

module.exports = router;