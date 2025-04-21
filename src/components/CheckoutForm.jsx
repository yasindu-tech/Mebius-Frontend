// src/components/CheckoutForm.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCreatePaymentIntentMutation } from '../features/api/apiSlice';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const { data } = await createPaymentIntent({ amount: 1000, currency: 'usd' });

    const payload = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={processing || succeeded}>
        {processing ? 'Processing…' : 'Pay Now'}
      </button>
      {error && <div>{error}</div>}
      {succeeded && <div>Payment succeeded!</div>}
    </form>
  );
};

export default CheckoutForm;
