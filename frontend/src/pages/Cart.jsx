import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative w-full h-[30vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/src/assets/heroImage.jpg')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-30"></div>

        {/* Centered Text */}
        <div className="relative text-white text-center">
          <h1
            className="text-5xl font-bold uppercase"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            CHECKOUT AND PAYMENTS
          </h1>
          <p
            className="text-lg mt-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            Your room reservations and events payments
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        {/* <h1 className="text-3xl font-bold mb-6">Your Cart</h1> */}

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="bg-gray-100 p-4 shadow space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold capitalize">
                      {item.slug.replace("-", " ")}
                    </h2>
                    <p className="text-gray-700">
                      <strong>Arrival:</strong> {item.arrivalDate}
                    </p>
                    <p className="text-gray-700">
                      <strong>Departure:</strong> {item.departureDate}
                    </p>
                    <p className="text-gray-700">
                      <strong>Adults:</strong> {item.numAdults}
                    </p>
                    <p className="text-gray-700">
                      <strong>Children:</strong> {item.numChildren}
                    </p>
                    {item.selectedPackages?.length > 0 && (
                      <p className="text-gray-700">
                        <strong>Packages:</strong>{" "}
                        {item.selectedPackages.join(", ")}
                      </p>
                    )}
                    <p className="text-gray-700">
                      <strong>Total Price:</strong> ${item.totalPrice}
                    </p>
                    {/*  <p className="text-gray-500 text-sm">
                      <strong>ID:</strong> {item.quantity}
                    </p> */}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.slug)}
                    className="text-[#8E7037] font-bold hover:text-red-700 text-xl cursor-pointer"
                  >
                    x
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => navigate("/checkout")}
              className="mt-6 bg-[#8E7037] text-white px-6 py-2 hover:bg-[#a0844d]"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartPage;
