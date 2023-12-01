import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductDisplay = ({deletecart,SetLoading,setCartItems,total}) => {

    
    const handleSubmit = async (event) => {


        event.preventDefault();
   
        try {
          const price=total();
          // Make an API call to create a checkout session
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/payment/create-checkout-session`, {
          total:price
          });
    
          if (response.data) {    
            console.log(response)
             const {session }=response.data;
            // // Redirect to the checkout session URL
            if(session)
            {
                console.log(session)
                // navigate(session)
                window.location.href = session;
            }
            
          } else {
            // Handle error response
            console.error("Failed to create checkout session");
          }
        } catch (error) {
          console.error("Error creating checkout session:", error);
        }
      };
return(
  <section>
    <div className="flex items-center justify-center py-8">
      {/* <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <img
          className="w-full h-48 object-cover mb-4"
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Stubborn Attachments</h3>
          <h5 className="text-gray-700">$20.00</h5>
        </div>
      </div> */}
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
)
};

const Message = ({ message }) => (
  <section className="text-center">
    <p className="text-xl">{message}</p>
  </section>
);

const App = ({deletecart,SetLoading,setCartItems,total}) => {
  console.log(total)
    const navigate=useNavigate();
  
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");  
      
    
      
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
        
      );
  
      navigate('/cart')
    }
  }, []);

  

  return message ? <Message message={message} /> : <ProductDisplay deletecart={ deletecart} SetLoading={SetLoading}  total={total} setCartItems={setCartItems} />;
};

export default App;
