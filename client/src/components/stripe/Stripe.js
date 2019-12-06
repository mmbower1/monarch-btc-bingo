import React, { useState } from 'react';
import ReactDOM from 'react-dom';
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
            <h3>Pay with Stripe:</h3>
            <br />
            <StripeCheckout
                stripeKey="pk_test_MYtc1Y9o2kastiaotdprXIpM00kcIqDurv"
                token={handleToken}
                billingAddress
                shippingAddress
                amount={product.price * 100}
                name={product.name}
            />
        </div>
    )
}
