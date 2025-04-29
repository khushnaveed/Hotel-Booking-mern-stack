import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    // Check if the item already exists in the cart
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.slug === item.slug);

    if (existingItemIndex >= 0) {
      // If the item already exists, increase its quantity
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += item.quantity; // Increment quantity
      setCartItems(updatedItems);
    } else {
      // If it's a new item, add it to the cart with a quantity of 1 (or the initial quantity if provided)
      setCartItems((prev) => [...prev, { ...item, quantity: item.quantity || 1 }]);
    }
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
