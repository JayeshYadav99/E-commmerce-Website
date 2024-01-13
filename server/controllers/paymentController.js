import stripe from 'stripe';


 console.log(process.env.STRIPE_API_SECRET)
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
        
        const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

        // You should calculate the payment amount on the server to prevent
        // tampering. This is just a simple example, so we're hardcoding the amount.
        const line_items=req.body.cart.items.map((item)=>{
         return{ price_data: { 
            currency: 'inr',
            product_data: {
              name: item.name,
              Images:[item.image],
              description: item.description,
              metadata:{
                id:item._id,
              }
            },
            unit_amount: item.price*100,
          },  
          quantity: item.quantity,  
        } 
      })
        const customer = await stripeInstance.customers.create({
          metadata: {
            userId:req.body.userId,
            cart: cart.items,
          },
          name: 'Jenny Rosen',
          email: 'jennyrosen@example.com',
        });
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
        const stripeInstance = stripe(process.env.STRIPE_API_SECRET);

        const{total,items}=req.body;


        // const product = await stripeInstance.products.create({
        //   name: 'Gold Plan',
        // });

        const line_items=req.body.items.map((item)=>{
          return{ 
            price_data: { 
             currency: 'inr',
             product_data: {
               name: item.name,
               images:[item.photo.url],
               description: item.description,
               metadata:{
                 id:item._id,
               }
             },
             unit_amount: Math.ceil(item.price*100),
           },  
           quantity: item.quantity,  
         } 
       })
       console.log("LINE Items",line_items)
       console.log(items);
         const customer = await stripeInstance.customers.create({
           metadata: {
             userId:req.body.userId,
          
           },
           name: 'Jenny Rosen',
           email: 'jennyrosen@example.com',
         });
         const paymentIntent = await stripeInstance.paymentIntents.create({
           amount: 1099,
           currency: 'inr',
         });
        const price = await stripeInstance.prices.create({
          currency: 'inr',
          unit_amount:Math.round(total*100),
          
          product_data: {
            name: 'Total amount',
          },
        });
        console.log(price.id)

        
        const session = await stripeInstance.checkout.sessions.create({
          shipping_address_collection: {
            allowed_countries: ['IN', 'CA'],
          },
          shipping_options: [
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 0,
                  currency: 'inr',
                },
                display_name: 'Free shipping',
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 5,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 7,
                  },
                },
              },
            },
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 1500,
                  currency: 'inr',
                },
                display_name: 'Next day air',
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 1,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 1,
                  },
                },
              },
            },
          ],
          customer : customer.id,
          line_items,
          phone_number_collection: {
            enabled: true,
          },
          mode: 'payment',
          success_url: `${process.env.CLIENT_URL}/order-success`,
          cancel_url: `https://transparentshopping.onrender.com/cart?canceled=true`,
        });



        res.status(200).json( {session:session.url});
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server Error' });
      }
    };
    
