import express from 'express';
import stripe from 'stripe';
import { createOrder } from '../controllers/orderController.js';
import { processPayment, sendStripeApiKey ,PaymentCheckout, PaymentIntent, createCheckoutSession} from '../controllers/paymentController.js';
const router = express.Router();
const stripeInstance = stripe("sk_test_51OGLoGSCN0lEsRfmmIEcy5EiipCHZNueSgNAzzcEJ3G2O2w3h73AaDif4lFBgEpsm6jL03p0zHn7qQD8RTfkcNas00F6Gm9y0C");
// const endpointSecret = "whsec_01c73c8182cbadc43da8cd31a8be5083b31dd62c2595c72c2a8ae5a9c5d2d22b"; THis is local secret
const endpointSecret = "whsec_e99vOuzLSRH7cHgdbA2ePHXt8VF9jTZa"
router.post('/payment', processPayment);
router.post('/', PaymentCheckout);
router.post('/create-checkout-session', createCheckoutSession);
router.post('/create-intent', PaymentIntent);
router.get('/stripeapikey', sendStripeApiKey);



async function getCartItems(line_items) {
  return new Promise((resolve, reject) => {
    let cartItems = [];

    line_items?.data?.forEach(async (item) => {
      const product = await stripeInstance.products.retrieve(item.price.product);
      const productId = product.metadata.id;

      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
      });

      if (cartItems.length === line_items?.data.length) {
        resolve(cartItems);
      }
    });
  });
}






router.post('/webhook', express.raw({type: 'application/json'}),async(request, response) => {
  
    console.log("called");
    const sig = request.headers['stripe-signature'];
let data;
    let event;
    
  
      // console.log("req.body",request.body)
        try {
            event = stripeInstance.webhooks.constructEvent(request.body, sig, endpointSecret);
data=event.data.object;
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
           stripeInstance.customers.retrieve(data.customer)
           .then(async(customer)=>{
            const lineItems = await stripeInstance.checkout.sessions.listLineItems(
              `${checkoutSessionCompleted.id}`
            );
            console.log("lineItems",lineItems)
            const orderItems = await getCartItems(lineItems);
            console.log("orderItems",orderItems)
            createOrder(customer,data, orderItems);
           }).catch((err)=>{
             console.log(err);
           })


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
