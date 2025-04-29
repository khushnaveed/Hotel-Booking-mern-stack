import React from "react";
import { useCart } from "../../context/CartContext.jsx";

const ReservationSummary = () => {
  const { cartItems } = useCart();

  // Calculate the total of all items in the cart
  const total = cartItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

  return (
    <div className="bg-white shadow-md p-6 sticky top-8 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Reservation Summary</h3>

      {/* Loop through each item in the cart */}
      {cartItems.map((item, index) => (
        <div key={index} className="flex gap-4 border-b pb-4 mb-4">
          {/* Image */}
          <img
            src={item.image || "https://via.placeholder.com/80"}
            alt={item.slug}
            className="w-20 h-20 object-cover"
          />
          
          {/* Item Info */}
          <div className="text-sm flex-1">
            <p className="font-semibold capitalize">{item.slug.replace(/-/g, " ")}</p>
            
            {/* Display Event or Room Specific Info */}
            {item.arrivalDate && item.departureDate ? (
              // Room reservation details
              <>
                <p>{item.arrivalDate} to {item.departureDate}</p>
                <p>{item.numAdults} Adults, {item.numChildren} Children</p>
              </>
            ) : (
              // Event details
              <p>Total Tickets: {item.quantity}</p> 
            )}
            
            {/* Display the price for event or room */}
            <p className="text-[#8E7037] font-medium">${item.totalPrice ? item.totalPrice.toFixed(2) : '0.00'}</p>
          </div>
        </div>
      ))}

      {/* Subtotal */}
      <div className="flex justify-between text-gray-600">
        <span>Subtotal</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {/* Taxes */}
      <div className="flex justify-between text-gray-600">
        <span>Taxes</span>
        <span>${(total * 0.1).toFixed(2)}</span>
      </div>

      {/* Total */}
      <div className="border-t pt-4 flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span className="text-[#8E7037]">${(total * 1.1).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ReservationSummary;
