import React, { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

const conversionRates = {
  USD: 1,
  EUR: 0.93,
  GBP: 0.8,
};

let defaultCurrency = "USD";

export const CurrencyProvider = ({ children }) => {
  const [prevCurrency, setPrevCurrency] = useState(defaultCurrency);
  const [currency, setCurrency] = useState(defaultCurrency);

  useEffect(() => {
    const saved = localStorage.getItem("currency");
    if (saved) setCurrency(saved);
  }, []);

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        changeCurrency,
        conversionRates,
        setPrevCurrency,
        setCurrency,
        prevCurrency,
      }}>
      {children}
    </CurrencyContext.Provider>
  );
};

const useCurrency = () => {
  return useContext(CurrencyContext);
};

export { useCurrency };
