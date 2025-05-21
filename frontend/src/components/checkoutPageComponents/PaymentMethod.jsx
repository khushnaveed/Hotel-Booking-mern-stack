import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../../context/CartContext";

export default function PaymentMethod() {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  const { cartItems, formatCartForStripe } = useCart();
  const baseUrl =
    import.meta.env.MODE === "development" ? "http://localhost:5005" : "";
  const handleCheckout = async () => {
    try {
      const formattedCartItems = cartItems.map((item) => ({
        ...item,
      }));

      const response = await fetch(baseUrl + "/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          cartItems: formattedCartItems,
          orderTotalAmount: cartItems.reduce((acc, each) => {
            return acc + each.totalPrice;
          }, 0),
        }),
      });

      const session = await response.json();
      console.log(session);

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <button
        onClick={handleCheckout}
        className="w-full px-6 py-3 bg-[#8E7037] lg:w-4/12 text-white border border-[#8E7037]  hover:bg-white hover:text-[#8E7037] transition-colors duration-200">
        Checkout
      </button>
    </div>
  );
}
