import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const GuestContext = createContext();

export const GuestProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [guest, setGuest] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:5005" : "";

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(baseUrl + "/guest/verifytoken",{
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

    setIsLoggedIn(true);
    setGuest(guestData.data); 
    navigate("/profile");
  };
  const logout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("guestData"); 
    setIsLoggedIn(false); 
    setGuest(null); 
    navigate("/login"); 
  };

  const register = (guestData) => {
    
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
