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

const steps = ["guest", "payment", "confirmation"];
const stepLabels = {
  guest: "Guest Details",
  payment: "Payment",
  confirmation: "Confirmation",
};

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

/*   const next = () => setStep(steps[steps.indexOf(step) + 1]); */
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
        const response = await fetch("http://localhost:5005/bookings", {
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
        clearCart(); // Clear cart only after booking is created
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
      {/* Hero */}
      <section
        className="relative top-0 left-0 w-full h-[80vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="relative text-white text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold uppercase"
          >
            Complete Your Booking
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg mt-2"
          >
            Just a few steps away from your perfect stay
          </motion.p>
        </div>
      </section>

      {/* Step Indicator */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-10">
        <div className="flex items-center justify-between">
          {steps.map((item, index) => {
            const isActive = step === item;
            const isCompleted = steps.indexOf(step) > index;
            return (
              <div key={item} className="flex-1 flex items-center">
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
                  <div className="flex-1 h-1 mx-2 bg-gray-300 relative">
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
            className="lg:grid lg:grid-cols-3 lg:gap-8"
          >
            {/* Left Column */}
            <div className="lg:col-span-2">
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
                    <PaymentMethod
                      onNext={next}
                      onBack={prev}
                      setPaymentData={setPaymentData}
                    />
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

            {/* Right Column */}
            <div className="mt-10 lg:mt-0 ml-5">
              {step !== "confirmation" ? (
                <ReservationSummary
                  setPriceDetails={setPriceDetails}
                  isConfirmationStep={false}
                />
              ) : bookingReference ? (
                <BookingDetails bookingReference={bookingReference} />
              ) : (
                <div className="text-center text-gray-500 p-4">
                  Loading your booking...
                </div>
              )}
              <div className="flex flex-col">
                <button
                  onClick={() => navigate("/rooms")}
                  className="mt-6 p-5 py-2 bg-[#8E7037] text-white flex items-center justify-center  border border-[#8E7037]  hover:bg-white hover:text-[#8E7037] transition-colors duration-200"
                >
                  Continue to book more rooms
                </button>
                <button
                  onClick={() => navigate("/events")}
                  className="mt-6 p-5 py-2 bg-[#8E7037] text-white flex items-center justify-center  border border-[#8E7037]  hover:bg-white hover:text-[#8E7037] transition-colors duration-200"
                >
                  Continue to book more events
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CheckoutFlow;
