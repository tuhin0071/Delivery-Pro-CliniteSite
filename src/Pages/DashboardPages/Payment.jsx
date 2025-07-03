import React from 'react';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const Payment = () => {
      return (
            <Elements stripe={stripePromise} >
<PaymentForm/>
            </Elements>
      );
};

export default Payment;