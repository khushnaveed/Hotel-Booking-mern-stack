import React from "react";
import { useCart } from "../../context/CartContext.jsx";

const ReservationSummary = () => {
  const { cartItems } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-8 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Reservation Summary</h3>
      {cartItems.map((item, index) => (
        <div key={index} className="flex gap-4 border-b pb-4 mb-4">
          {/* Image */}
          <img
            src={item.image || "https://via.placeholder.com/80"}
            alt={item.slug}
            className="w-20 h-20 rounded-lg object-cover"
          />
          {/* Item Info */}
          <div className="text-sm flex-1">
            <p className="font-semibold capitalize">{item.slug.replace(/-/g, " ")}</p>
            <p>{item.arrivalDate} to {item.departureDate}</p>
            <p>{item.numAdults} Adults, {item.numChildren} Children</p>
            <p className="text-[#8E7037] font-medium">${item.totalPrice}</p>
          </div>
        </div>
      ))}
      <div className="flex justify-between text-gray-600">
        <span>Subtotal</span>
        <span>${total}</span>
      </div>
      <div className="flex justify-between text-gray-600">
        <span>Taxes</span>
        <span>${(total * 0.1).toFixed(2)}</span>
      </div>
      <div className="border-t pt-4 flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span className="text-[#8E7037]">${(total * 1.1).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ReservationSummary;
