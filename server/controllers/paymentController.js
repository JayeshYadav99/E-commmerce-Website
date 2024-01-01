import stripe from 'stripe';
import dotenv from 'dotenv';

const stripeInstance = stripe("sk_test_51OGLoGSCN0lEsRfmmIEcy5EiipCHZNueSgNAzzcEJ3G2O2w3h73AaDif4lFBgEpsm6jL03p0zHn7qQD8RTfkcNas00F6Gm9y0C");
console.log(process.env.STRIPE_API_SECRET);

// Controller function for processing payments
export const processPayment = async (req, res) => {
  console.log(req.body.amount);
    const myPayment = await stripeInstance.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
          company: "Ecommerce",
        },
      });
    
      res
        .status(200)
        .json({ success: true, client_secret: myPayment.client_secret });
    }
    
    export const sendStripeApiKey = async (req, res,) => {
      res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
    };

    export const PaymentCheckout=async (req,res)=>{ 
      let status, error;
      const { token, amount } = req.body;
      try {
        await stripeInstance.charges.create({
          source: token.id,
          amount,
          currency: 'usd',
        });
        status = 'success';
      } catch (error) {
        console.log(error);
        status = 'Failure';
      }
      res.json({ error, status });
    
    }
    export const PaymentIntent = async (req, res) => {
      try {
        // You should calculate the payment amount on the server to prevent
        // tampering. This is just a simple example, so we're hardcoding the amount.
        const paymentIntent = await stripeInstance.paymentIntents.create({
          amount: 1099,
          currency: 'inr',
        });
    
        res.status(200).json({ client_secret: paymentIntent.client_secret });
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server Error' });
      }
    };
    export const createCheckoutSession = async (req, res) => {
      try {
        const{total}=req.body;


        // const product = await stripeInstance.products.create({
        //   name: 'Gold Plan',
        // });
        const price = await stripeInstance.prices.create({
          currency: 'inr',
          unit_amount:Math.ceil(total*100),
          
          product_data: {
            name: 'Total amount',
          },
        });
        console.log(price.id)

        
        const session = await stripeInstance.checkout.sessions.create({
          line_items: [
            {
              
              price: price.id,
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `http://localhost:5173/cart?success=true`,
          cancel_url: `http://localhost:5173/cart?canceled=true`,
        });



        res.status(200).json( {session:session.url});
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server Error' });
      }
    };
    
