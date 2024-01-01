import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import cors from "cors";
import cloudinary from "cloudinary"
import bodyParser from 'body-parser';
import stripe from 'stripe';
//configure env
dotenv.config();

//databse config
connectDB();
cloudinary.v2.config({
  cloud_name:"difz9x1sc",
  api_key:"228477943368782",
  api_secret:"3WmnFnJmOIzAhoKj_hlfYiH48Zg"
})

//rest object
const app = express();

//middelwares
// 
const endpointSecret = "whsec_01c73c8182cbadc43da8cd31a8be5083b31dd62c2595c72c2a8ae5a9c5d2d22b";

// app.use(app.use(bodyParser.raw({type: "*/*"})) )

app.use(cors());
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook' || req.originalUrl === '/api/v1/payment/webhook') {
    // Skip JSON parsing for the '/webhook' route
    next();
  } else {
    // Use express.json() middleware for other routes
    express.json()(req, res, next);
  }
});

app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productRoutes);
app.use("/api/v1/cart",cartRoutes);
app.use("/api/v1/payment",paymentRoute);

// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => 
// {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripeInstance.webhooks.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     console.log(err);
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }   

//   // Handle the event
//   switch (event.type) {
//     case 'checkout.session.async_payment_failed':
//       const checkoutSessionAsyncPaymentFailed = event.data.object;
//       // Then define and call a function to handle the event checkout.session.async_payment_failed
//       break;
//     case 'checkout.session.async_payment_succeeded':
//       const checkoutSessionAsyncPaymentSucceeded = event.data.object;
//       console.log(checkoutSessionAsyncPaymentSucceeded)
//       // Then define and call a function to handle the event checkout.session.async_payment_succeeded
//       break;
//     case 'checkout.session.completed':
//       const checkoutSessionCompleted = event.data.object;
//       console.log("CALLED",checkoutSessionCompleted  )
//       response.status(200).json(checkoutSessionCompleted);
//       // Then define and call a function to handle the event checkout.session.completed
//       break;
//     case 'checkout.session.expired':
//       const checkoutSessionExpired = event.data.object;
//       // Then define and call a function to handle the event checkout.session.expired
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }


 
// });


//rest api
app.get("/montior", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});
// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js



const stripeInstance = stripe("sk_test_51OGLoGSCN0lEsRfmmIEcy5EiipCHZNueSgNAzzcEJ3G2O2w3h73AaDif4lFBgEpsm6jL03p0zHn7qQD8RTfkcNas00F6Gm9y0C");


// This is your Stripe CLI webhook secret for testing your endpoint locally.





//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
