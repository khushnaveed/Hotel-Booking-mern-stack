import React, { useEffect } from "react";
import { useCart } from "../../context/CartContext.jsx";

const ReservationSummary = ({ setPriceDetails }) => {
  const { cartItems, removeFromCart } = useCart(); // Assuming `removeFromCart` is defined in your context

  // Calculate the total of all items in the cart
  const subtotal = cartItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
  const taxes = subtotal * 0.1; // Assume 10% tax
  const total = subtotal + taxes;

  // Pass the calculated prices to the parent component
  useEffect(() => {
    setPriceDetails({ subtotal, taxes, total });
  }, [cartItems, subtotal, taxes, total, setPriceDetails]);

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId); // Call the removeFromCart function from context to remove the item
  };

  return (
    <div className="bg-white shadow-md p-6 sticky top-8 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Reservation Summary</h3>

      {/* Loop through each item in the cart */}
      {cartItems.map((item, index) => (
        <div key={index} className="flex gap-4 border-b pb-4 mb-4 relative">
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

          {/* X Button to Remove Item */}
          <button 
            onClick={() => handleRemoveItem(item._id)} // Pass the item ID to the remove function
            className="absolute top-0 right-0 text-red-500 text-xl cursor-pointer m-9"
          >
            &times; {/* X button */}
          </button>
        </div>
      ))}

      {/* Subtotal */}
      <div className="flex justify-between text-gray-600">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      {/* Taxes */}
      <div className="flex justify-between text-gray-600">
        <span>Taxes</span>
        <span>${taxes.toFixed(2)}</span>
      </div>

      {/* Total */}
      <div className="border-t pt-4 flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span className="text-[#8E7037]">${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ReservationSummary;
