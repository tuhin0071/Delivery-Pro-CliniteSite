import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecqure from '../../Hooks/useAxiosSecqure';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const PaymentForm = () => {
  const stripe = useStripe();               // stripe instance
  const elements = useElements();           // stripe elements instance
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecqure();

  const { parcelId } = useParams();
  console.log("ParcelId:", parcelId);

  // Fetch the parcel info by ID from backend
  const { data: parcelInfo } = useQuery({
    queryKey: ['parcels', parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  console.log("Parcel Info:", parcelInfo);

  // Defensive check if parcelInfo is undefined initially
  const price = parcelInfo?.price || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Stripe not yet loaded
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError('');

    // Get the card details from the CardElement field
    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Card element not loaded.");
      setProcessing(false);
      return;
    }

    try {
      // STEP 1: Request clientSecret from backend
      const res = await axiosSecure.post('/create-payment-intent', {
        price: price,
      });

      const clientSecret = res.data.clientSecret;
      console.log("Received client secret:", clientSecret);

      // STEP 2: Confirm the card payment using clientSecret
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
        },
      });

      if (confirmError) {
        console.error("Payment error:", confirmError);
        setError(confirmError.message);
        setProcessing(false);
        return;
      }

      console.log("✅ Payment Intent:", paymentIntent);

      if (paymentIntent.status === 'succeeded') {
        // Payment was successful
        setSuccess(true);
        setProcessing(false);
        
        // Optionally send payment info to backend here to save it

        // Redirect to My Parcel page
        navigate('/dashBoard/myparcel');
      }

    } catch (err) {
      console.error("Payment Exception:", err);
      setError("An error occurred during payment.");
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment Details</h2>

      {success ? (
        <p className="text-green-600 text-center font-semibold">
          Payment successful!
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Stripe CardElement renders the card input fields */}
          <div className="mb-4">
            <CardElement
              options={CARD_ELEMENT_OPTIONS}
              className="p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Show any errors */}
          {error && (
            <p className="text-red-600 text-sm mb-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={!stripe || processing}
            className={`w-full py-2 rounded-md text-white font-semibold ${
              processing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {processing ? 'Processing...' : `Pay $${price}`}
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentForm;
