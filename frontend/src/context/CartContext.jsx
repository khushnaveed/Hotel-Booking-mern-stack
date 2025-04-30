import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


  // Add to cart

  /*  const [weather, setWeather] = useState(null);
   const [showWeather, setShowWeather] = useState(false);
   const [currency, setCurrency] = useState("USD"); */

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.slug === item.slug);

    if (existingItemIndex >= 0) {
      // If the item already exists, increase its quantity
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += item.quantity; // Increment quantity
      setCartItems(updatedItems);
    } else {
      // If it's a new item, add it to the cart
      setCartItems((prev) => [...prev, { ...item, quantity: item.quantity || 1 }]);
    }
  };

  // Remove from cart
  const removeFromCart = (slug) => {
    setCartItems((prev) => prev.filter((item) => item.slug !== slug)); // Remove by slug
  };

  // Clear the entire cart
  const clearCart = () => setCartItems([]);

  // Update the quantity of an item in the cart
  const updateItemQuantity = (slug, quantity) => {
    if (quantity <= 0) return; // Avoid setting quantity to zero or negative
    const updatedItems = cartItems.map((item) =>
      item.slug === slug ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
