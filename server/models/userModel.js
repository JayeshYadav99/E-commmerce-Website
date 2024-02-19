import mongoose from "mongoose";
import cartModel from "./cartModel.js";

const createEmptyCartForUser = async (user) => {
  try {
    console.log(user);
    const newCart = await cartModel.create({ user: user._id, items: [] });

    // Add a reference to the cart in the user model
    user.cart = newCart._id;
    await user.save();

    return newCart;
  } catch (error) {
    console.log(error)
    throw new Error("Error creating cart for user");
  }
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    SecurityAnswer: {
      type: String,
      required: true,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
    budget: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);



export default mongoose.model("users", userSchema);
