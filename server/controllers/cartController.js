import cartModel from "../models/cartModel.js";
import userModel from "../models/userModel.js";

export const newCart = async (req, res) => {
  try {
    // Check if the userModel exists
    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new cart associated with the userModel
    const newCart = await cartModel.create({ user: user._id, items: [] });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getCart = async (req, res) => {
  try {
    console.log(req.params.userId)
    const cart = await cartModel.findOne({ user: req.params.userId }).populate("items.product"); // Populate user details
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};const calculateTotalCost = (cart) => {
  return cart.items.reduce((total, currentItem) => {
    const pricePerItem = currentItem.product.price; // Assuming price is accessible like this
    const quantity = currentItem.quantity;
    return total + (pricePerItem * quantity);
  }, 0);
};
export const UpdateCart = async (req, res) => {
  try {
    console.log(req.body.action)
    // Check if the user exists
    const user = await userModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the user's cart
    const userCart = await cartModel.findOne({ user: user._id })
    console.log(userCart)
    // If the cart doesn't exist, create a new one
    if (!userCart) {
      const newCart = await cartModel.create({ user: user._id, items: [] });
      return res.json(newCart);
    }

    // Handle different update scenarios based on the request body
    if (req.body.action === 'updateQuantity') {
      // Update the quantity of a specific item in the cart
      const { productId, quantity } = req.body;
      console.log(productId, quantity)

      const cartItem = userCart.items.find((item) => {
        return item._id.toString() === productId;
      });

      if (cartItem) {
        console.log("came here", cartItem)
        cartItem.quantity = quantity;
        console.log(cartItem.quantity)
      }
    } else if (req.body.action === 'removeItem') {


      // Remove a specific item from the cart
      const { productId } = req.body;
      console.log(productId)
      console.log(userCart.items)
      const updatedUserItems = userCart.items.filter((item) => {
        const isMatchingProduct = item._id.toString() === productId;
        console.log(isMatchingProduct);
      
        return !isMatchingProduct; // Return true to keep the item or false to filter it out
      });
      console.log(updatedUserItems)
      userCart.items = updatedUserItems;


    } else if (req.body.action === 'updateCart') {
      // Update the entire cart with a new set of items
      userCart.items = req.body.items;
    } else if (req.body.action === 'addItem') {
      // Add a new item to the cart
      console.log("addItem caklled");
      const { productId, quantity } = req.body;

      const existingItemIndex = userCart.items.findIndex((item) => item.product.toString() === productId);

      if (existingItemIndex !== -1) {
        // If the item already exists, update the quantity
        console.log("already exists");
        userCart.items[existingItemIndex].quantity += quantity;
      } else {
        // If the item doesn't exist, add it to the cart
        userCart.items.push({ product: productId, quantity });
      }
    } else if (req.body.action === 'clearCart') {
      // Clear the entire cart
      console.log("came here");
      userCart.items = [];
      console.log(userCart)
    }

    // Save the updated cart
    const updatedCart = await userCart.save();

    // Populate the user details in the updated cart
    const populatedCart = await updatedCart.populate('items.product');
    const totalCost = calculateTotalCost(populatedCart);
    console.log(populatedCart)
    res.json({
       populatedCart,
      total: totalCost
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteCart = async (req, res) => {
  try {
    // Check if the user exists
    const user = await userModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user's cart
    const deletedCart = await cartModel.findOneAndRemove({ user: user._id }).populate('user', 'name email'); // Populate userModel details

    if (!deletedCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}