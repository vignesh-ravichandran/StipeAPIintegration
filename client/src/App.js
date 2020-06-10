import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import axios from 'axios';
import SingleState from './context/SingleState';
import Productpage from './Productpage';

 
const stripePromise = loadStripe("pk_test_51Gr4HODgIdfRreZYmUfULz1hoZm6RQdN7TQmCM3Tl9d6cdYaP5g6Xvl7sqYXCwZCB78EGqQxnLqjKNDkZi98HXZp002YVehq9E");


function App() {

  



  return (
    <div className="App contain">
      <SingleState>
      <h1>Payment app</h1>
      <Productpage/>
      <Elements stripe={stripePromise}>
      <CheckoutForm/>
    </Elements>
      
    </SingleState>
    </div>
  );
}

export default App;
