import { useEffect, createContext, useContext, useState } from "react";
import axios from "axios";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const cart = localStorage.getItem("cart");
        if (cart) {
            setCartItems(JSON.parse(cart));
        }
    }, []);

    return (
        <CartContext.Provider value={[cartItems, setCartItems]}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
