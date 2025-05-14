import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../../context/CartContext";

export default function PaymentMethod() {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  const { cartItems, formatCartForStripe } = useCart();

  const handleCheckout = async () => {
    //console.log("debugging");
    //console.log(cartItems)
    try {
      const formattedCartItems = cartItems.map((item) => ({
        /*  name: item.title || item.slug,
         description: item.date
           ? `Event Date:${item.date}`
           : `Check-in: ${item.arrivalDate},
          Check-out: ${item.departureDate},
           ${item.numAdults} Adults,
            ${item.numChildren} Children`,
         price: item.totalPrice * 100,
         quantity: item.quantity,
         image: item.image, */
        ...item,


      }));

      const response = await fetch(
        "http://localhost:5005/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token")
          },
          body: JSON.stringify({
            cartItems: formattedCartItems, orderTotalAmount: cartItems.reduce((acc, each) => {
              return acc + (each.totalPrice)
            }, 0)
          }),
        }
      );

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
        className="px-6 py-3 bg-[#8E7037] w-6/12 text-white border border-[#8E7037]  hover:bg-white hover:text-[#8E7037] transition-colors duration-200"
      >
        Checkout
      </button>
    </div>
  );
}
