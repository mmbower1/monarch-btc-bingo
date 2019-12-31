import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

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
        <div className='stripe-container'>
            <br />
            <StripeCheckout
              label='Pay With Stripe'
              name='Bitcoin Bingo'
              stripeKey="pk_test_MYtc1Y9o2kastiaotdprXIpM00kcIqDurv"
              billingAddress
              shippingAddress
              token={handleToken}
              amount={product.price * 100}
              name={product.name}
            />
              <br />
              <br />
              <div className='test-warning'>
                Test credit card:
                <br />
                4242 4242 4242 4242
                Exp: 01/20 - CVV: 123
              </div>
            </div>
          <br />
          <Link to='/login'> Skip</Link> &nbsp;
          <i class="fas fa-arrow-right"></i>
      </div>
    )
}
