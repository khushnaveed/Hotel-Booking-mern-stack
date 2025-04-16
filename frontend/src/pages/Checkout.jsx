import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { state } = useLocation();
  const { addToCart } = useCart();

  // UseEffect with state as dependency will be triggered on state change
  useEffect(() => {
    if (state && state.slug && state.totalPrice) {
      addToCart(state); // Add booking info to the cart only if valid state exists
    }
  }, [state, addToCart]); // Ensure useEffect only runs when state or addToCart changes

  if (!state) {
    return <div>No booking data found.</div>; // Handle when there's no state
  }

  const {
    slug,
    arrivalDate,
    departureDate,
    numAdults,
    numChildren,
    selectedPackages,
    totalPrice,
  } = state;

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/abstract-blur-defocused-hotel-lobby-interior-background-vintage-filter_875825-64135.jpg')",
      }}
    >
      <div className="p-8 rounded-2xl shadow-2xl max-w-xl w-full bg-white/80 backdrop-blur-md">
        <div className="text-center mb-6">
          <h1
            className="text-5xl font-bold uppercase text-white"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            ROYAL GRAND
          </h1>
          <h4 className="text-2xl font-semibold text-gray-800 mt-2 uppercase">
            Checkout Summary
          </h4>
        </div>
        <div className="text-left text-gray-700 space-y-3">
          <p><strong>Room:</strong> {slug}</p>
          <p><strong>Arrival Date:</strong> {arrivalDate}</p>
          <p><strong>Departure Date:</strong> {departureDate}</p>
          <p><strong>Adults:</strong> {numAdults}</p>
          <p><strong>Children:</strong> {numChildren}</p>
          <p><strong>Total Price:</strong> ${totalPrice}</p>
        </div>
        <div className="mt-6 text-center">
          <button className="bg-black text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-gray-800 transition">
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
}
