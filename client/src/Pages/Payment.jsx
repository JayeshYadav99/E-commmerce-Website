import React,{useState,useEffect,useRef} from 'react'
import {loadStripe} from '@stripe/stripe-js';
import{
    CardElement,
    CardNumberElement, 
    CardCvcElement,
    CardExpiryElement,
    PaymentElement,
  Elements,

    useStripe,
    useElements
    } from '@stripe/react-stripe-js'
import axios from 'axios'



const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
  
    const [errorMessage, setErrorMessage] = useState(null);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (elements == null) {
        return;
      }
  
      // Trigger form validation and wallet collection
      const {error: submitError} = await elements.submit();
      if (submitError) {
        // Show error to your customer
        setErrorMessage(submitError.message);
        return;
      }
  
      // Create the PaymentIntent and obtain clientSecret from your server endpoint
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/payment/create-intent`, {
        method: 'POST',
      });
 
      const {client_secret: clientSecret} = await res.json();
      console.log(clientSecret);
      const {error} = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        clientSecret,
        confirmParams: {
          return_url: 'http://localhost:5173/',
        },
      });
  
      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        console.log(error)
        setErrorMessage(error.message);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    };
  
    return (
    
               <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button type="submit" disabled={!stripe || !elements}>
          Pay
        </button>
        {/* Show error message to your customers */}
        {errorMessage && <div>{errorMessage}</div>}
      </form>
     
   
    );
  };
  
  const stripePromise = loadStripe('pk_test_51OGLoGSCN0lEsRfmEaw0HiopUS47t7c14pEwL16jPtmUv6BOaUkPP1pS676Ow1OWfUsnXS9oHdUcoBDQX7LhhV3h00QLlxSoqJ');
  
  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'inr',
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };
  const App = () => (
    <Elements stripe={stripePromise} options={options}>
      <Payment />
    </Elements>
  );

export default App;