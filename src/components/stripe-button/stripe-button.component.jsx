import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const psriceForStripe = price * 100;
    const publishableKey = 'pk_test_5RStTWVlGBc4ajEqN8UhsV4300UtmJmKmB';
    const onToken = token => {
        console.log(token);
        alert('Paymant successful');
    }

    return (
       <StripeCheckout 
       label='Pay Now'
       name='CRWN Clothing Ltd.'
       billingAddress
       shippingAddress
       image='https://sendeyo.com/up/d/f3eb2117da'
       description={`Your total is $${price}`}
       amount={psriceForStripe}
       panelLabel='Pay Now'
       token={onToken}
       stripeKey={publishableKey}
       />
    )
}

export default StripeCheckoutButton;