import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  /*  const [weather, setWeather] = useState(null);
   const [showWeather, setShowWeather] = useState(false);
   const [currency, setCurrency] = useState("USD"); */
  const addToCart = (item) => {
    // Check if the item already exists in the cart
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.slug === item.slug);

    if (existingItemIndex >= 0) {
      // If the item already exists, don't add it again. You can also update the quantity if needed.
      return;
    }

    // If it's a new item, add it to the cart
    setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
  };

  const removeFromCart = (slug) => {
    setCartItems((prev) => prev.filter((item) => item.slug !== slug));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
