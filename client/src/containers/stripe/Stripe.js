import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { Footer } from '../../components/footer/Footer.styles.js'
import { StripeContainer, StripeTest } from './Stripe.styles.js';
import axios from 'axios';

export const Stripe = ({ price }) => {
  const priceForStripe = price * 100;
  const publishablekey = 'pk_test_MYtc1Y9o2kastiaotdprXIpM00kcIqDurv';

  function handleToken(token) {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    }).then(res => {
      alert('Stripe payment successful')
    }).catch(err => {
      console.log('Payment error: ', JSON.parse(err));
      alert('Payment error. Please retry.')
    })
  }

  return (
    <div>
      <StripeContainer>
        <br />
        <StripeCheckout
          amount={priceForStripe}
          label='Pay With Stripe'
          name='Bitcoin Bingo'
          description={`Your total is ${price}`}
          stripeKey={publishablekey}
          billingAddress
          shippingAddress
          token={handleToken}
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
      <Footer>© 2020 Copyright. Blockchain Bingo, all rights reserved.</Footer>
    </div>
  )
}
