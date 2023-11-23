import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import slugify from "slugify";
import productModel from "../models/productModel.js";
import products from './products.js';

const categories = [
    { name: "Foods", id: "651a6bcb505a03a13761041a" },
    { name: "electronics", id: "651a6c2d505a03a137610424" },
    { name: "Beauty", id: "651a6c58505a03a13761045d" },
    { name: "kids", id: "651a8f54505a03a1376158ce" },
    { name: "Games", id: "651a8f7f505a03a1376158d6" },
    { name: "Skincare and Daily Essential", id: "651a9c34505a03a13761597c" },
    { name: "Bags", id: "652a57d722f7e2afc0b91c7d" },
    { name: "men's clothing", id: "652b612722f7e2afc0b91cc1" },
    { name: "women's clothing", id: "65523d100e471051602601d0" },
    { name: "jewelery", id: "65523d1f0e471051602601d5" },
    // ... add other categories
];
const categoryMap = categories.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
}, {});

// Configure Cloudinary
cloudinary.config({
    cloud_name:"difz9x1sc",
    api_key:"228477943368782",
    api_secret:"3WmnFnJmOIzAhoKj_hlfYiH48Zg"
});

// Connect to your MongoDB database
mongoose.connect('mongodb+srv://Jazzy49:MyNodeApp@nodeprojects.tsxlcqi.mongodb.net/Datadb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Check the connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB');

    try {
        // Delete all existing products
        // await productModel.deleteMany({});
        console.log('All existing products deleted.');

        // Read and process only the first 10 products from the JSON file
        const productsToInsert = products.slice(11,20).map((product, index) => {
            return {
                ...product,
                id: undefined,
                shipping: true,
                category: categoryMap[product.category.toLowerCase()] || null,
                quantity: Math.floor(Math.random() * 10) + 1,
            };
        });

        // Upload photos to Cloudinary and update the productsToInsert array
        for (let i = 0; i < productsToInsert.length; i++) {
            const product = productsToInsert[i];
            console.log(`Uploading image for product ${i + 11}...`);

            const imageUrl = product.image;
            const result = await cloudinary.uploader.upload_large(imageUrl, { fetch_format: 'auto', quality: 'auto' });
            product.photo = {
                url: result.secure_url,
                public_id: result.public_id,
            };
            product.slug = slugify(product.name, { lower: true });
        }

        // Insert products in bulk
        const insertedProducts = await productModel.insertMany(productsToInsert);

        console.log(insertedProducts);
        console.log(`${insertedProducts.length} products inserted successfully.`);

    } catch (error) {
        console.error('Error inserting products:', error);
    } finally {
        // Close the connection after insertion
        mongoose.connection.close();
    }
});
