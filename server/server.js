import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import cloudinary from "cloudinary"
import bodyParser from 'body-parser';
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
app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
