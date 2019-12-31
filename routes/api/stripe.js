const express = require('express');
const router = express.Router();
const config = require('config');
const ErrorResponse = require('../../utils/errorResponse');
const stripe = require('stripe')("sk_test_l7ZOKG8SM7eRZ9b56dD89GrC00zvtQL3t1");
const uuid = require('uuid/v4');

router.get('/', (req, res) => {
    res.send(console.log('stripe'));
});

router.post('/', async (req, res, next) => {
    // var error;
    // var status;
    try {
        const { product, token } = req.body;
        console.log('req.body: ', req.body)
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        // prevent double payments
        const potencyKey = uuid();
        const charge = await stripe.charges.create({
            amount: product.price * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }
        },
        {
            potencyKey
        })
        console.log("Charge:", { charge });
        // status = "success";
    } catch (err) {
        // status = "failure"
        return next(new ErrorResponse('Stripe payment could not be sent', 500))
    }
})

module.exports = router;