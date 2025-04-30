// src/context/GuestContext.js
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the context
export const GuestContext = createContext();

// Create a provider component
export const GuestProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [guest, setGuest] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const guestData = JSON.parse(localStorage.getItem("guestData"));

    if (token && guestData) {
      setIsLoggedIn(true);
      setGuest(guestData.data);
    } else {
      setIsLoggedIn(false);
      setGuest(null);
    }

    setLoading(false);
  }, []);

  // Handle login
  const login = (token, guestData) => {
    localStorage.setItem("token", token); // Store token in localStorage
    localStorage.setItem("guestData", JSON.stringify(guestData)); // Store guest data
    setIsLoggedIn(true);
    setGuest(guestData.data); // Set guest data
    navigate("/profile");
  };
  // Handle logout
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("guestData"); // Optionally, remove guest data from localStorage
    setIsLoggedIn(false); // Update the state to reflect logged out status
    setGuest(null); // Clear guest data
    navigate("/login"); // Redirect to login page
  };

  // Handle registration
  const register = (guestData) => {
    // Assuming registration API is handled elsewhere
    // You can directly call your API here, then call login if needed
  };

  return (
    <GuestContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        guest,
        setGuest,
        login,
        logout,
        register,
        loading,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
};
