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
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
const navigate = useNavigate();

const axiosSecure = useAxiosSecqure();



const {parcelId} = useParams()
console.log(parcelId);


const {data:parcelInfo}= useQuery({
      queryKey:['parcels',parcelId],
      queryFn: async()=>{
            const res = await axiosSecure.get (`/parcels/${parcelId}`);
            return res.data;
      }
})

console.log(parcelInfo);

const price =  parcelInfo?.price;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError('');

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else {
      console.log('Payment Method Created:', paymentMethod);
      setSuccess(true);
      setProcessing(false);
        navigate('/dashBoard/myparcel');
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
          <div className="mb-4">
            <CardElement
              options={CARD_ELEMENT_OPTIONS}
              className="p-3 border border-gray-300 rounded-md"
            />
          </div>

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
            {processing ? 'Processing...' : `Pay ৳${price}`}
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentForm;
