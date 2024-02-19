import mongoose from "mongoose";
const specificationSchema = new mongoose.Schema({
  key: String, // e.g., "Flavor", "Form Factor"
  value: mongoose.Schema.Types.Mixed // Allows for any value type: String, Number, Array, etc.
}, { _id: false });
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    specifications: [specificationSchema],
    quantity: {
      type: Number,
      required: true,
    },
    photo: [{
      url: String,
      public_id: String
    }],
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);