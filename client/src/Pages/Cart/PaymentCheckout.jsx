import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from '../../Context/Cart'
import { useAuth } from "../../Context/Auth";

const ProductDisplay = ({ deletecart, SetLoading, total }) => {
  const[cartItems,setCartItems]=useCart();
  
  const[auth,SetAuth]=useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const price = total();
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/payment/create-checkout-session`,
        {
          total: price,
          userId:auth.user._id,
          items:cartItems
        }
      );

      if (response.data) {
        const { session } = response.data;
        if (session) {
          window.location.href = session;
        }
      } else {
        console.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-center py-8">
        {/* Your product display content */}
      </div>
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
        >
          Checkout
        </button>
      </form>
    </section>
  );
};

const Message = ({ message }) => (
  <section className="text-center">
    <p className="text-xl">{message}</p>
  </section>
);

const App = ({ deletecart, SetLoading, setCartItems, total }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [auth,SetAuth]=useAuth();







  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {



      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
      navigate('/cart');
    }
  }, []);

  return message ? <Message message={message} /> : <ProductDisplay deletecart={deletecart} SetLoading={SetLoading} total={total} setCartItems={setCartItems} />;
};

export default App;
