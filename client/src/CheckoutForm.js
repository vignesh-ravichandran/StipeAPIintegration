import React,{useContext}  from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import SingleContext from './context/singleContext'


import CardSection from './CardSection';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  
  const singleContext=useContext(SingleContext);

  const {clientsecret,loading, removeSecret}=singleContext;

  const handleSubmit = async (event) => {
    event.preventDefault();
    // We don't want to let default form submission happen here,
    //console.log(clientsecret.client_secret);
    // which would refresh the page.
   
    console.log(clientsecret);

    if (!stripe || !elements || !clientsecret ||  loading===true) { //
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      console.log('not enough')
      return;
    }
       
    const result = await stripe.confirmCardPayment(clientsecret.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      }
    });
   
    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      alert(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {

        alert('{Payment succeeded and order placed}');
        // Show a success message to your customer
        // webhook placed too, incase if customer closed it halfway
      }
      if(result.paymentIntent.status ==='result.paymentIntent.status ==='){
        alert('Insufficient funds in your card');
      }
    }
  //
   removeSecret();

  };

  return (
    <form onSubmit={handleSubmit}>
        <div className='container'>
        <CardSection />
        </div>
     
      <button disabled={!stripe || clientsecret==null}>Confirm order</button>  
    </form>
  );
}
// 