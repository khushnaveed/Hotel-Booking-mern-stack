// src/components/ReservationSummary.js
import React, { useEffect } from "react";
import { useCart } from "../../context/CartContext.jsx";

const ReservationSummary = ({ setPriceDetails, isConfirmationStep }) => {
  const { cartItems, removeFromCart, updateItemQuantity } = useCart();

  // Function to update the total price of an event item based on its quantity
  const updateTotalPrice = (item) => {
    return (item.totalPrice = item.price * item.quantity); // Price is multiplied by quantity to get total price
  };

  // Calculate the total of all items in the cart
  const subtotal = cartItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
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
          {/* Image */}
          <img
            src={item.image || "https://via.placeholder.com/80"}
            alt={item.slug}
            className="w-20 h-20 object-cover "
          />

          {/* Item Info */}
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
            <p className="text-[#8E7037] font-medium">${item.totalPrice ? item.totalPrice.toFixed(2) : '0.00'}</p>
          </div>

          {/* X Button to Remove Item (Only visible if not in confirmation step) */}
          {!isConfirmationStep && (
            <button
              onClick={() => handleRemoveItem(item.slug)} // Remove by slug
              className="absolute top-2 right-2 text-black text-xl cursor-pointer hover:text-[#8E7037]"
            >
              &times; {/* X button */}
            </button>
          )}

          {/* Quantity Controls (Only visible if not in confirmation step and the item doesn't have arrival/departure dates) */}
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
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-gray-600 text-sm">
        <span>Taxes</span>
        <span>${taxes.toFixed(2)}</span>
      </div>

      <div className="border-t pt-4 flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span className="text-[#8E7037]">${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ReservationSummary;
