const express=require('express');
const bodyParser=require('body-parser');
const config  =require('config');
const path     =require('path');
const stripe = require('stripe')(config.get('StripSecret'));


const app=express();



  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());



//function to create payment intent
const createIntent=async (product, price)=>{


  try {
    
  
  const paymentIntent = await stripe.paymentIntents.create({
    
    description: product,
    shipping: {
      name: 'Jenny Rosen',
      address: {
        line1: '510 Townsend St',
        postal_code: '98140',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
      },
    },
    amount: price,
    currency: 'usd',
    payment_method_types: ['card'],
    });
  
     
    return paymentIntent;
  
  
  } catch (error) {
    console.log(error);
  }

}


//routes
//check page
app.get('/test',(req,res,next)=>{

    res.send('Stripe Payment implementation');
})

//create payment intent
app.post('/secret', async (req, res,next) => {
  
    const {product, price, quantity}=req.body;
    const priceint=parseInt(price);
    const quantityint=parseInt(quantity);
    
    const intent = await createIntent(product, (priceint*quantityint*100)) ;
    res.json({client_secret: intent.client_secret});
  });


 //webhook to listen for stripe events
 app.post('/webhook', (request, response) => {
   console.log('webhook received');
  let event;
  
  try {
    event=request.body;
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

     // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('succeeded for payment');
      console.log(paymentIntent);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    case 'charge.succeeded':
      console.log('charge is also succeeded');
      break;  
    // ... handle other event types
    case 'payment_intent.payment_failed':
       console.log('Payment intent failed');
       break;
    case 'charge.failed':
      console.log('charge failed');
      break;   
    default:
      // Unexpected event type
      return response.status(400).end();
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});

// server static assets in production 
if(process.env.NODE_ENV ==='production'){

  //set static folder 
  app.use(express.static('client/build'));
  
  app.get('*', (req, res)=> res.sendFile(path.resolve(__dirname,'client','build','index.html')));
  
  
  }


const PORT=process.env.PORT || 5000;


app.listen(PORT,()=>console.log(`server started at port ${PORT}`));