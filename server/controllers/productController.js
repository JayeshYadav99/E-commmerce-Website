import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";
import { v2 as cloudinary } from 'cloudinary';
import mongoose from "mongoose";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};
export const createProductControllercloud = async (req, res) => {
  try {
    console.log("final");
    const { name, description, price, category, quantity, shipping, specifications } = req.fields;

    const photos = req.files.photo; // This could be an array of files
   

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is Required" });
      case !description:
        return res.status(400).send({ error: "Description is Required" });
      case !price:
        return res.status(400).send({ error: "Price is Required" });
      case !category:
        return res.status(400).send({ error: "Category is Required" });
      case !quantity:
        return res.status(400).send({ error: "Quantity is Required" });
      case !photos || photos.length === 0:
        return res.status(400).send({ error: "At least one photo is required" });
    }

    // Handle multiple photo uploads
    let uploadedPhotos = [];
    console.log(photos, "photos")
    if (Array.isArray(photos)) {
      console.log("Called");
      // Multiple files
      for (let photo of photos) {
        if (photo.size > 1000000) {
          return res.status(400).send({ error: "Each photo should be less than 1MB" });
        }
        const result = await cloudinary.uploader.upload(photo.path);
        uploadedPhotos.push({
          url: result.secure_url,
          public_id: result.public_id
        });
      }
    } else {
   ;
      // Single file (fallback)
      if (photos.size > 1000000) {
        return res.status(400).send({ error: "Photo should be less than 1MB" });
      }
      const result = await cloudinary.uploader.upload(photos.path);
      console.log(result)
      uploadedPhotos.push({
        url: result.secure_url,
        public_id: result.public_id
      });
    }

    const product = new productModel({
      ...req.fields,
      photo: uploadedPhotos, // Assuming your model can handle an array of photos
      slug: slugify(name),
      specifications: JSON.parse(specifications)
    });
    await product.save();

    console.log("Product created", product);

    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};


//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
// get single product
export const getSingleProductController = async (req, res) => {
  try {
    console.log(req.params);
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    res.setHeader('Cache-Control', 'no-store');
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping,specifications } =
      req.fields;
      const photos = req.files.photo; 
    //alidation

    console.log(category);
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
        case !photos || photos.length === 0:
          return res.status(400).send({ error: "At least one photo is required" });
    }

    // const products = await productModel.findByIdAndUpdate(
    //   req.params.pid,
    //   { ...req.fields, slug: slugify(name) },
    //   { new: true }
    // );
    // if (photo) {
    //   products.photo.data = fs.readFileSync(photo.path);
    //   products.photo.contentType = photo.type;
    // }
    // await products.save();
    console.log("image");

    let updatedProduct;

    if (photos) {
      // If a new photo is provided, upload it to Cloudinary and update the photo field
      let uploadedPhotos = [];
      console.log(photos, "photos")
      if (Array.isArray(photos)) {
        console.log("Called");
        // Multiple files
        for (let photo of photos) {
      
          if (photo.size > 1000000) {
            return res.status(400).send({ error: "Each photo should be less than 1MB" });
          }
          const result = await cloudinary.uploader.upload(photo.path);
          uploadedPhotos.push({
            url: result.secure_url,
            public_id: result.public_id
          });
        }
      } else {
     ;
        // Single file (fallback)
        if (photos.size > 1000000) {
          return res.status(400).send({ error: "Photo should be less than 1MB" });
        }
        const result = await cloudinary.uploader.upload(photos.path);
        console.log(result)
        uploadedPhotos.push({
          url: result.secure_url,
          public_id: result.public_id
        });
      }
  

      updatedProduct = await productModel.findByIdAndUpdate(
        req.params.pid,
        {
          ...req.fields,
          photo:uploadedPhotos,
          slug: slugify(name),specifications:JSON.parse(specifications)
        },
        { new: true }
      );
    } else {
      // If no new photo is provided, update only the non-photo fields
      updatedProduct = await productModel.findByIdAndUpdate(
        req.params.pid,
        { ...req.fields, slug: slugify(name),specifications:JSON.parse(specifications) },
        { new: true }
      );
    }

    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      Product:updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};
//filetrs
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    console.log(radio,checked)
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};
export const SearchProductController = async (req, res) => {
  try {
    const perPage = 6;
    const pageNumber = req.params.page || 1;
    const { keyword } = req.params;
    const { checked, radio } = req.body;

    const pipeline = [];
    if (checked.length > 0) {
      const categoryIds = checked.map((id) => new mongoose.Types.ObjectId(id));
      pipeline.push({ $match: { category: { $in: categoryIds } } });
    }
    if (keyword !== 'all') {
      pipeline.push({
        $match: {
          $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
          ],
        },
      });
    }


    if (radio.length) {
      pipeline.push({ $match: { price: { $gte: radio[0], $lte: radio[1] } } });
    }

    pipeline.push({ $sort: { createdAt: -1, _id: -1 } });
    pipeline.push({ $skip: (pageNumber - 1) * perPage });
    pipeline.push({ $limit: perPage });

    const [result, resultCount, productsCount] = await Promise.all([
      productModel.aggregate(pipeline),
      productModel.find({}).count(),
      productModel.estimatedDocumentCount(),
    ]);

    res.status(200).json({
      success: true,
      result,
      resultCount,
      productsCount,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error while filtering and searching products",
      error,
    });
  }
};

export const getAllProductsController = async (req, res) => { 
  try {
    const products = await productModel.find({}).populate('category').sort({ createdAt: -1, _id: -1 });
    res.status(200).send({
      success: true,
      products,
      message: "All Products fetched successfully",
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching all products",
      error,
    });
    
  }
}
// export const ProductListController = async (req, res) => {
//   try {
//     const perPage=6;
//     const page=req.params.page||1;
//     console.log(page);
//     const products = await productModel
//   .find({})
//   .sort({ createdAt: -1, _id: -1 })
//   .skip((page - 1) * perPage)
//   .limit(perPage);

//     const productscount=await productModel.estimatedDocumentCount();
// console.log(productscount)
// console.log(products)
// ;    res.status(200).send({
//       success: true,
//       products,
//       productscount,
//       message: "Product Paged successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while paging product",
//       error,
//     });
//   }
// };
export const RelatedProductController = async (req, res) => {
  try {
    
    const {pid,cid}=req.params;
    const products=await productModel.find({_id:{$ne:pid},category:cid}).limit(3).populate('category');
    res.status(200).send({
      success: true,
      products, 
      message: "Related Product fetched successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching realted product",
      error,
    });
  }
}

export const getCartProductController = async (req, res) => {
  try {
    const {cart}=req.body;
    console.log(cart)
    const products=await productModel.find({_id:{$in:cart}}).populate('category');
    res.status(200).send({
      success: true,
      products, 
      message: "Cart Product fetched successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching cart product",
      error,
    });
  }
}
export const createCartProductController = async (req, res) => {
  try {
    const {cart}=req.body;
    console.log(cart)
    const products=await productModel.find({_id:{$in:cart}}).populate('category');
    res.status(200).send({
      success: true,
      products, 
      message: "Cart Product fetched successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching cart product",
      error,
    });
  }
}