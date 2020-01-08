import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { Footer } from '../footer/Footer.styles.js'
import { StripeContainer, StripeTest } from './Stripe.styles.js';

export const Stripe = () => {
    const [product] = useState({
        name: 'Bitcoin Bingo card',
        price: 1
    })

    function handleToken(token) {
        fetch("/api/stripe", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(token)
        })
        .then(response => {
            if (!response.ok)
              throw response;
            return response.json();
          })
          .then(output => {
            console.log("Purchase succeeded:", output);
          })
          .catch(err => {
            console.log("Purchase failed:", err);
          }
        )
    }

    return (
      <div>
        <StripeContainer>
            <br />
            <StripeCheckout
              label='Pay With Stripe'
              name='Bitcoin Bingo'
              stripeKey="pk_test_MYtc1Y9o2kastiaotdprXIpM00kcIqDurv"
              billingAddress
              shippingAddress
              token={handleToken}
              amount={product.price * 100}
            />
              <br />
              <br />
              <StripeTest>
                Test credit card:
                <br />
                4242 4242 4242 4242
                Exp: 01/20 - CVV: 123
              </StripeTest>
            </StripeContainer>
          <br />
          <Link to='/login'> Skip</Link> &nbsp;
          <i className="fas fa-arrow-right"></i>
          <br />
          <br />
          <Footer>© 2019 Copyright. Blockchain Bingo, all rights reserved.</Footer>
      </div>
    )
}
