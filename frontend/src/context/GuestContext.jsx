import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const GuestContext = createContext();

export const GuestProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [guest, setGuest] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5005/guest/verifytoken",{
      method:"get",
      headers:{token:token}
    }).then(res=>res.json( 
      
    )) .then(result=>{
      if (result.success) {
        setIsLoggedIn(true);
        setGuest(result.data);
      } else {
        setIsLoggedIn(false);
        setGuest(null);
      }   
     })
    
    

    setLoading(false);
  }, []);

  const login = (token, guestData) => {
    localStorage.setItem("token", token); 





    //localStorage.setItem("guestData", JSON.stringify(guestData)); 
    setIsLoggedIn(true);
    setGuest(guestData.data); 
    navigate("/profile");
  };
  // Handle logout
  const logout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("guestData"); 
    setIsLoggedIn(false); 
    setGuest(null); 
    navigate("/login"); 
  };

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
