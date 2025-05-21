import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GuestDetails from "../components/checkoutPageComponents/GuestDetails";
import PaymentMethod from "../components/checkoutPageComponents/PaymentMethod";
import Confirmation from "../components/checkoutPageComponents/Confirmation";
import ReservationSummary from "../components/checkoutPageComponents/ReservationSummary";
import BookingDetails from "../components/checkoutPageComponents/BookingDetails";
import { CheckCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";

const steps = ["guest", "payment", "confirmation"];
const stepLabels = {
  guest: "Guest Details",
  payment: "Payment",
  confirmation: "Confirmation",
};
const baseUrl =
import.meta.env.MODE === "development" ? "http://localhost:5005" : "";

const CheckoutFlow = () => {
  const { cartItems, clearCart } = useCart();
  const [step, setStep] = useState("guest");
  const [guestData, setGuestData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [bookingReference, setBookingReference] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [priceDetails, setPriceDetails] = useState({
    subtotal: 0,
    taxes: 0,
    total: 0,
  });

  const next = () => {
    if (step === "guest" && cartItems.length === 0) {
      alert("Please Book your rooms and Events Before checkout.");
      return;
    }
    setStep(steps[steps.indexOf(step) + 1]);
  };

  const prev = () => setStep(steps[steps.indexOf(step) - 1]);
  const navigate = useNavigate();

  useEffect(() => {
    const submitBooking = async () => {
      const bookingPayload = {
        guest: guestData,
        payment: {
          ...paymentData,
          transactionId: `TXN-${Math.floor(Math.random() * 1000000)}`,
        },
        cartItems,
        subtotal: priceDetails.subtotal,
        taxes: priceDetails.taxes,
        total: priceDetails.total,
      };

      try {
        const response = await fetch(baseUrl + "/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(bookingPayload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to save booking");
        }

        const result = await response.json();
        setBookingDetails(result.booking);
        setBookingReference(result.bookingReference);
      } catch (error) {
        console.error("Booking submission error:", error.message);
      }
    };

    if (
      step === "confirmation" &&
      guestData &&
      paymentData &&
      !bookingReference
    ) {
      submitBooking().then(() => {
        clearCart();
      });
    }
  }, [step, guestData, paymentData]);

  const transitionVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const layoutVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        title="Complete Your Booking"
        subtitle=" Just a few steps away from your perfect stay"
        backgroundImage="/src/assets/heroImage.jpg"
      />

      {/* Step Indicator */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-10">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-6">
            {steps.map((item, index) => {
              const isActive = step === item;
              const isCompleted = steps.indexOf(step) > index;

              return (
                <div key={item} className="flex items-center">
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                        isActive
                          ? "border-[#8E7037] bg-[#8E7037] text-white"
                          : isCompleted
                          ? "border-[#8E7037] bg-white text-[#8E7037]"
                          : "border-gray-300 bg-white text-gray-500"
                      }`}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isCompleted ? <CheckCircle size={20} /> : index + 1}
                    </motion.div>
                    <span className="mt-2 text-sm font-medium text-gray-600">
                      {stepLabels[item]}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="h-1 w-50 mx-2 bg-gray-300 relative">
                      <motion.div
                        className="absolute h-1 bg-[#8E7037]"
                        initial={{ width: 0 }}
                        animate={{
                          width:
                            steps.indexOf(step) > index
                              ? "100%"
                              : steps.indexOf(step) === index
                              ? "50%"
                              : "0%",
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={layoutVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className={
              step === "payment"
                ? "ml-20 mr-20"
                : "lg:grid lg:grid-cols-3 lg:gap-8"
            }
          >
            {/* Left/Main Column */}
            <div className={step === "payment" ? "w-full" : "lg:col-span-2"}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  variants={transitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                >
                  {step === "guest" && (
                    <GuestDetails onNext={next} setGuestData={setGuestData} />
                  )}

                  {step === "payment" && (
                    <div className="space-y-6">
                      <ReservationSummary
                        setPriceDetails={setPriceDetails}
                        isConfirmationStep={false}
                      />

                      <PaymentMethod
                        onNext={next}
                        onBack={prev}
                        setPaymentData={setPaymentData}
                      />

                      <div className="flex flex-col sm:flex-row sm:justify-center gap-4 mt-8">
                        <button
                          onClick={() => navigate("/rooms")}
                          className="px-6 py-3 bg-white text-[#8E7037] border border-[#8E7037]  hover:bg-[#8E7037] hover:text-white transition-colors duration-200"
                        >
                          Continue to book more rooms
                        </button>
                        <button
                          onClick={() => navigate("/events")}
                          className="px-6 py-3 bg-white text-[#8E7037] border border-[#8E7037]  hover:bg-[#8E7037] hover:text-white transition-colors duration-200"
                        >
                          Continue to book more events
                        </button>
                      </div>
                    </div>
                  )}

                  {step === "confirmation" && guestData && paymentData && (
                    <Confirmation
                      bookingNumber={bookingReference}
                      bookingDetails={bookingDetails}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column (only visible on 'guest' and 'confirmation' steps) */}
            {step !== "payment" && (
              <div className="mt-10 w-full lg:mt-0 ml-5">
                {step === "guest" && (
                  <div className="space-y-6">
                    <ReservationSummary
                      setPriceDetails={setPriceDetails}
                      isConfirmationStep={false}
                    />
                    <div className="flex-col sm:flex-row justify-center gap-4 text-center" >
                      <button
                        onClick={() => navigate("/rooms")}
                        className="px-6 py-3 bg-[#8E7037] text-white border border-[#8E7037]  hover:bg-white hover:text-[#8E7037] transition-colors duration-200"
                      >
                        Continue to book more rooms
                      </button>
                      <button
                        onClick={() => navigate("/events")}
                        className="px-6 py-3 mt-5 bg-[#8E7037] text-white border border-[#8E7037]  hover:bg-white hover:text-[#8E7037] transition-colors duration-200"
                      >
                        Continue to book more events
                      </button>
                    </div>
                  </div>
                )}

                {step === "confirmation" &&
                  (bookingReference ? (
                    <BookingDetails bookingReference={bookingReference} />
                  ) : (
                    <div className="text-center text-gray-500 p-4">
                      Loading your booking...
                    </div>
                  ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CheckoutFlow;
