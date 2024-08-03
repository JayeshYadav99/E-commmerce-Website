import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { useCart } from "../../Context/Cart";
import { useAuth } from "../../Context/Auth";
import { useNavigate, Link, json } from "react-router-dom";
import axios from "axios";
import PaymentCheckout from "./PaymentCheckout";
import { toast } from "react-toastify";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cartItems, setCartItems] = useCart();
  const [cartproducts, setCartProducts] = useState([]);
  const [Loading, SetLoading] = useState(false);
  const [Total,setTotal]=useState(0);
  const navigate = useNavigate();

  const fetchCartDetails = async (userID) => {
    console.log("user Id", userID);
    try {
      // Make an Axios request to fetch cart details
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/cart/${userID}`
      ); // Adjust the API endpoint

      // Create an array to hold product details
      const{cart,total}=response.data;
      const products = cart.items.map((cartItem) => {
        console.log(cartItem.quantity);
        return {
          _id: cartItem._id,
          name: cartItem.product.name,
          description: cartItem.product.description,
          price: cartItem.product.price * cartItem.quantity,
          quantity: cartItem.quantity,
          photo: cartItem.product.photo,
          // Add other product details as needed
        };
      });
      console.log(cart,total);
      // Update the cart items in the context
      setCartItems(products);
      setTotal(total);

      // setCartItems(response.data[0].quantity);
      // setCartProducts(products);
    } catch (error) {
      console.error("Error fetching cart details:", error);
    }
  };

  useEffect(() => {
    // Fetch cart details when the component mounts and user is available
    if (auth.user) {
      console.log(auth);
      fetchCartDetails(auth?.user?._id);
    }
  }, [auth]);
  const TotalPrice = () => {
    console.log("Called after fetch");
    try {
      let total = 0;
      cartItems?.map((item) => (total += item.price));
      console.log(total, auth?.user?.budget);
      if (total > auth?.user?.budget) {
        console.log("Budget Exceeded Bhai ruk ja");
      }
      return total;
    } catch (error) {
      console.log(error);
    }
  };
  const clearCart = async () => {
    try {
      SetLoading(true);
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/cart/${auth.user._id}`,
        { action: "clearCart" }
      );
      setCartItems([]);
      localStorage.removeItem("cart"); // Clear the cart locally
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      SetLoading(false);
    }
  };

  const RemoveItem = async (product) => {
    try {
      console.log("Remove item called");
      // Make an API call to remove the item from the backend
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/cart/${auth.user._id}`,
        {
          action: "removeItem",
          productId: product._id, // Assuming product has an 'id' property
        }
      );
      console.log(response.data);
      // If the API call is successful, update the frontend state
      let updatedCart = [...cartItems];
      const indexToRemove = updatedCart.findIndex(
        (item) => item.id === product.id
      );

      if (indexToRemove !== -1) {
        updatedCart.splice(indexToRemove, 1);
        console.log(`Removed product with ID ${product.id} from the cart`);
      } else {
        console.log(`Product with ID ${product.id} not found in the cart`);
      }

      setCartItems(updatedCart);

      // Remove the item from local storage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error removing item:", error);
      // Handle errors as needed
    }
  };

  const QuantityChange = async (action, product) => {
    try {
      var newQuantity;

      if (action === "+") {
        console.log(product.quantity, "+");
        if (Total > auth?.user?.budget) {
          toast.error("You have exceeded your budget");
        }

        newQuantity = product.quantity + 1;
        console.log(newQuantity);
      } else if (action === "-" && product.quantity > 0) {
        newQuantity = product.quantity - 1;
      } else {
        return; // Do nothing if the action is not 'increase' or 'decrease' or quantity is already 0
      }

      // Make a request to update the quantity in the backend
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/cart/${auth.user._id}`,
        {
          action: "updateQuantity",
          productId: product._id, // Assuming you have a productId property in your product object
          quantity: newQuantity,
        }
      );

      // Check the response status or handle the response as needed
      if (response.status === 200) {
        console.log(
          `Successfully updated quantity of product ${product._id} to ${newQuantity}`
        );
        console.log(response.data);
        const { total } = response.data;
        console.log(total, auth);
        if (total > auth?.user?.budget) {
          toast.error("You have exceeded your budget");
        }
        const products = response.data.populatedCart.items.map((cartItem) => {
          console.log(cartItem.quantity);
          return {
            _id: cartItem._id,
            name: cartItem.product.name,
            description: cartItem.product.description,
            price: cartItem.product.price * cartItem.quantity,
            quantity: cartItem.quantity,
            photo: cartItem.product.photo,
            // Add other product details as needed
          };
        });
        setCartItems(products);
        // TotalPrice();
        // Update the quantity in your frontend state or component
        // For example, you might have a function to update the state like setProducts(updatedProducts);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      // Handle errors as needed
    }
  };

  // useEffect(() => {

  //   fetchCartDetails(auth?.user?._id);
  // }, [auth ])

  return (
    <Layout title={"Cart"}>
      <div>
        <div className="container mx-auto mt-10">
          <div className="flex shadow-md my-10">
            <div className="w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl">
                  {cartItems?.length} Items
                </h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Quantity
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Price
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Total
                </h3>
              </div>
              {/* {JSON.stringify(cartItems)} */}

              {cartItems?.map((product) => (
                <>
                  <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                    <div className="flex w-2/5">
                      {" "}
                      {/* product */}
                      <div className="w-20">
                        {product?.photo && product?.photo[0] && (
                          <img
                            className="h-24"
                            src={product?.photo[0]?.url}
                            alt
                          />
                        )}
                      </div>
                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">
                          {product?.name}
                        </span>

                        <button
                          onClick={() => RemoveItem(product)}
                          className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-center w-1/5">
                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                        onClick={() => QuantityChange("-", product)}
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                      {/* {JSON.stringify(cartItems)} */}
                      <input
                        className="mx-2 border text-center text-bold w-12"
                        type="text"
                        value={product.quantity}
                      />

                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                        onClick={() => QuantityChange("+", product)}
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </div>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      ₹{product?.price?.toFixed(2)}
                    </span>

                    <span className="text-center w-1/5 font-semibold text-sm">
                      ₹{product?.price?.toFixed(2)}
                    </span>
                  </div>
                </>
              ))}

              <Link
                to="/ProductGallery"
                className="flex font-semibold text-indigo-600 text-sm mt-10"
              >
                <svg
                  className="fill-current mr-2 text-indigo-600 w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </Link>
            </div>

            <div id="summary" className="w-1/4 px-8 py-10">
              <div className="border-t mt-8">
                <PaymentCheckout
                  deletecart={clearCart}
                  SetLoading={SetLoading}
                  setCartItems={setCartItems}
                  total={TotalPrice}
                />
              </div>
              <div className="border-t mt-8">
                {/* Clear Cart Button */}
                <button
                  className="bg-gray-500 font-semibold hover:bg-gray-600 px-5 py-2 text-sm text-white uppercase"
                  onClick={clearCart}
                  // disabled={loading}
                >
                  {Loading ? "Clearing Cart..." : "Clear Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
