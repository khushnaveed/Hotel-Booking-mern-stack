import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext.jsx";
import { useCurrency } from "../../context/CurrencyContext.jsx";
const ReservationSummary = ({ setPriceDetails, isConfirmationStep }) => {
  const { cartItems, setCartItems, removeFromCart, updateItemQuantity } = useCart();
  const { currency, conversionRates, prevCurreny, setPrevCurrency } = useCurrency();
  const currencySymbols = { USD: "$", EUR: "€", GBP: "£" };
  // Function to update the total price of an event item based on its quantity
  const conversionRate = parseFloat(conversionRates?.[currency]) || 1;
  const updateTotalPrice = (item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 0;
    item.totalPrice = price * quantity * conversionRate;
    return item.totalPrice;
  };

  useEffect(() => {
    console.log(cartItems)
    console.log(currency)
    console.log(prevCurreny)
    setCartItems(cartItems.map(item => {
      const exchangeRates = {
        USD: { USD: 1, EUR: 0.93, GBP: 0.80 },
        EUR: { USD: 1.08, EUR: 1, GBP: 0.86 },
        GBP: { USD: 1.25, EUR: 1.16, GBP: 1 },
      };

      return (
        { ...item, totalPrice: item.totalPrice * exchangeRates[prevCurreny][currency] }

      )
    }))
    setPrevCurrency(currency)
  }, [currency])


  // Calculate the total of all items in the cart

  const subtotal = cartItems.reduce((sum, item) => {
    //const price = parseFloat(item.price) || 0;
    //const quantity = parseInt(item.quantity) || 0;
    return sum + item.totalPrice * item.quantity;
  }, 0);


  const taxes = subtotal * 0.1; // Assume 10% tax
  const total = subtotal + taxes;

  // Pass the calculated prices to the parent component
  useEffect(() => {
    setPriceDetails({ subtotal, taxes, total });
  }, [cartItems, subtotal, taxes, total, setPriceDetails]);

  const handleRemoveItem = (slug) => {
    removeFromCart(slug); // Remove by slug
  };

  const handleChangeQuantity = (slug, newQuantity) => {
    const updatedItem = cartItems.find((item) => item.slug === slug);
    updatedItem.quantity = newQuantity;

    // Update the total price of the item based on its new quantity
    updateTotalPrice(updatedItem);

    // Now update the item in the cart
    updateItemQuantity(slug, newQuantity);
  };

  return (
    <div className="bg-white shadow-md p-6 sticky top-8 space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Reservation Summary</h3>

      {cartItems.map((item) => (
        <div key={item.slug} className="flex gap-4 border-b pb-4 mb-4 relative">
          <img
            src={item.image || "https://via.placeholder.com/80"}
            alt={item.slug}
            className="w-20 h-20 object-cover "
          />

          <div className="text-sm flex-1">
            <p className="font-semibold capitalize">{item.slug.replace(/-/g, " ")}</p>
            {item.arrivalDate && item.departureDate ? (
              <>
                <p>{item.arrivalDate} to {item.departureDate}</p>
                <p>{item.numAdults} Adults, {item.numChildren} Children</p>
              </>
            ) : (
              <p>Total Tickets: {item.quantity}</p>
            )}
            <p className="text-[#8E7037] font-medium">
              {currencySymbols[currency]}{item.totalPrice ? item.totalPrice.toFixed(2) : '0.00'}</p>
          </div>

          {!isConfirmationStep && (
            <button
              onClick={() => handleRemoveItem(item.slug)} // Remove by slug
              className="absolute top-2 right-2 text-black text-xl cursor-pointer hover:text-[#8E7037]"
            >
              &times;
            </button>
          )}

          {!isConfirmationStep && !item.arrivalDate && !item.departureDate && (
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => handleChangeQuantity(item.slug, item.quantity - 1)}
                disabled={item.quantity <= 1} // Prevent decreasing quantity below 1
                className="border border-gray-300 text-xl w-8 h-8 rounded-full hover:bg-[#8E7037] hover:text-white"
              >
                -
              </button>
              <span className="text-lg">{item.quantity}</span>
              <button
                onClick={() => handleChangeQuantity(item.slug, item.quantity + 1)}
                className="border border-gray-300 text-xl w-8 h-8 rounded-full hover:bg-[#8E7037] hover:text-white"
              >
                +
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-between text-gray-600 text-sm">
        <span>Subtotal</span>
        <span>{currencySymbols[currency]}{subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-gray-600 text-sm">
        <span>Taxes</span>
        <span>{currencySymbols[currency]}{taxes.toFixed(2)}</span>
      </div>

      <div className="border-t pt-4 flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span className="text-[#8E7037]">{currencySymbols[currency]}{total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ReservationSummary;





