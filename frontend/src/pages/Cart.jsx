import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 mt-28 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold capitalize">{item.slug.replace("-", " ")}</h2>
                  <p className="text-gray-300">
                    <strong>Arrival:</strong> {item.arrivalDate}
                  </p>
                  <p className="text-gray-300">
                    <strong>Departure:</strong> {item.departureDate}
                  </p>
                  <p className="text-gray-300">
                    <strong>Adults:</strong> {item.numAdults}
                  </p>
                  <p className="text-gray-300">
                    <strong>Children:</strong> {item.numChildren}
                  </p>
                  {item.selectedPackages?.length > 0 && (
                    <p className="text-gray-300">
                      <strong>Packages:</strong>{" "}
                      {item.selectedPackages.join(", ")}
                    </p>
                  )}
                  <p className="text-gray-300">
                    <strong>Total Price:</strong> ${item.totalPrice}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <strong>ID:</strong> {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.slug)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => navigate("/checkout")}
            className="mt-6 bg-[#8E7037] text-white px-6 py-2 rounded hover:bg-[#a0844d]"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
