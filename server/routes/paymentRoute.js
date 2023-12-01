import express from 'express';
import stripe from 'stripe';
import { processPayment, sendStripeApiKey ,PaymentCheckout, PaymentIntent, createCheckoutSession} from '../controllers/paymentController.js';
const router = express.Router();
const stripeInstance = stripe("sk_test_51OGLoGSCN0lEsRfmmIEcy5EiipCHZNueSgNAzzcEJ3G2O2w3h73AaDif4lFBgEpsm6jL03p0zHn7qQD8RTfkcNas00F6Gm9y0C");
const endpointSecret = "whsec_01c73c8182cbadc43da8cd31a8be5083b31dd62c2595c72c2a8ae5a9c5d2d22b";
router.post('/payment', processPayment);
router.post('/', PaymentCheckout);
router.post('/create-checkout-session', createCheckoutSession);
router.post('/create-intent', PaymentIntent);
router.get('/stripeapikey', sendStripeApiKey);
router.post('/webhook', (request, response) => {
  
    
    const sig = request.headers['stripe-signature'];

    let event;
  
      console.log("req.body",request.body)
        try {
            event = stripeInstance.webhooks.constructEvent(request.body, sig, endpointSecret);
        } catch (err) {
          console.log(err);
          response.status(400).send(`Webhook Error: ${err.message}`);
          return;
        }   
      
        // Handle the event
        switch (event.type) {
          case 'checkout.session.async_payment_failed':
            const checkoutSessionAsyncPaymentFailed = event.data.object;
            // Then define and call a function to handle the event checkout.session.async_payment_failed
            break;
          case 'checkout.session.async_payment_succeeded':
            const checkoutSessionAsyncPaymentSucceeded = event.data.object;
            console.log(checkoutSessionAsyncPaymentSucceeded)
            // Then define and call a function to handle the event checkout.session.async_payment_succeeded
            break;
          case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object;
            console.log("CALLED",checkoutSessionCompleted  )
            response.status(200).json(checkoutSessionCompleted);
            // Then define and call a function to handle the event checkout.session.completed
            break;
          case 'checkout.session.expired':
            const checkoutSessionExpired = event.data.object;
            // Then define and call a function to handle the event checkout.session.expired
            break;
          // ... handle other event types
          default:
            console.log(`Unhandled event type ${event.type}`);
        }
});
export default router;
