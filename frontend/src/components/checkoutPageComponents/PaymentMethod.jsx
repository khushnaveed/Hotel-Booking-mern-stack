

import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../../context/CartContext";

export default function PaymentMethod() {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  const { cartItems, formatCartForStripe } = useCart();

  const handleCheckout = async () => {
    //console.log("debugging");
    //console.log(cartItems)
    try {
      const formattedCartItems = cartItems.map(item => ({
        name: item.title || item.slug,
        description: item.date
          ? `Event Date:${item.date}`
          : `Check-in: ${item.arrivalDate},
         Check-out: ${item.departureDate},
          ${item.numAdults} Adults,
           ${item.numChildren} Children`,
        price: item.totalPrice * 100,
        quantity: item.quantity,
        image: item.image
      }));

      const response = await fetch("http://localhost:5005/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems: formattedCartItems }),
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
        className="bg-[#8E7037] text-white font-semibold cursor-pointer hover:bg-white hover:text-[#8E7037] py-2 px-6  transition duration-300"
      >
        Checkout
      </button>
    </div>
  );
}

