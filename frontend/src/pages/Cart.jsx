import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Package, Users, Calendar, X } from "lucide-react";

function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="absolute top-0 left-0 w-full h-[30vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center "
        style={{ backgroundImage: "url('/src/assets/heroImage.jpg')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-30"></div>

        {/* Centered Text */}
        <div className="relative text-white text-center">
          <h1
            className="text-5xl font-bold uppercase "
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            Your Reservations
          </h1>
          <p
            className="text-lg mt-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            Review your selected accommodations and experiences
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 mt-[40vh] space-y-12 lg:space-y-0 lg:space-x-8 ">
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added any reservations yet.
            </p>
            <button
              onClick={() => navigate("/rooms")}
              className="bg-[#8E7037] text-white px-8 py-3 rounded-md hover:bg-[#a0844d] transition duration-300"
            >
              Browse Rooms
            </button>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-semibold capitalize text-gray-800">
                          {item.slug.replace("-", " ")}
                        </h2>
                        <button
                          onClick={() => removeFromCart(item.slug)}
                          className="text-gray-400 hover:text-red-600 transition duration-300"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 text-gray-600">
                          <Calendar className="w-5 h-5 text-[#8E7037]" />
                          <div>
                            <p className="font-medium">Check-in</p>
                            <p>{item.arrivalDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                          <Calendar className="w-5 h-5 text-[#8E7037]" />
                          <div>
                            <p className="font-medium">Check-out</p>
                            <p>{item.departureDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                          <Users className="w-5 h-5 text-[#8E7037]" />
                          <div>
                            <p className="font-medium">Guests</p>
                            <p>
                              {item.numAdults} Adults, {item.numChildren}{" "}
                              Children
                            </p>
                          </div>
                        </div>
                        {item.selectedPackages?.length > 0 && (
                          <div className="flex items-center space-x-3 text-gray-600">
                            <Package className="w-5 h-5 text-[#8E7037]" />
                            <div>
                              <p className="font-medium">Packages</p>
                              <p>{item.selectedPackages.join(", ")}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 flex justify-end">
                        <p className="text-2xl font-semibold text-[#8E7037]">
                          ${item.totalPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${total}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes</span>
                    <span>${(total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-[#8E7037]">
                        ${(total * 1.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-[#8E7037] text-white py-3 rounded-md hover:bg-[#a0844d] transition duration-300 mt-6"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
