import express from "express";
import multer from 'multer'
// import singleUpload from "../middlewares/multer.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
  productFilterController,createProductControllercloud, SearchProductController, RelatedProductController,
  getAllProductsController,
  globalSearch,
  getProductsByCategoryController
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import bodyParser from 'body-parser';
const router = express.Router();


router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable({
    multiples: true,
  }),


  createProductController
);
router.post(
  "/create-product-cloud",
  requireSignIn,
  isAdmin,
  formidable({
    multiples: true,
  }),
 
 

  createProductControllercloud
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable({
    multiples: true,
  }),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/product/:pid", deleteProductController);

//fileter product
router.post("/product-filter",productFilterController);
// router.get("/product-page/:page",ProductListController);
router.post("/search/:keyword/:page",SearchProductController);
router.get("/get-all-products",getAllProductsController);
//fetch similar products
router.get("/get-similar-product/:pid/:cid",RelatedProductController);
router.post("/globalSearch", globalSearch);
router.get('/category/:categoryId', getProductsByCategoryController);


export default router;