import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GuestDetails from "../components/checkoutPageComponents/GuestDetails";
import PaymentMethod from "../components/checkoutPageComponents/PaymentMethod";
import Confirmation from "../components/checkoutPageComponents/Confirmation";
import ReservationSummary from "../components/checkoutPageComponents/ReservationSummary";
import { CheckCircle } from "lucide-react";
import { useCart } from "../context/CartContext";

const steps = ["guest", "payment", "confirmation"];

const stepLabels = {
  guest: "Guest Details",
  payment: "Payment",
  confirmation: "Confirmation",
};

const CheckoutFlow = () => {
  const { cartItems } = useCart();
  const [step, setStep] = useState("guest");
  const [guestData, setGuestData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const next = () => setStep(steps[steps.indexOf(step) + 1]);
  const prev = () => setStep(steps[steps.indexOf(step) - 1]);

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

  const calculateOrderSummary = () => {
    const roomTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity * item.nights,
      0
    );
    const taxes = roomTotal * 0.1;
    const total = roomTotal + taxes;
    return { roomTotal, taxes, total };
  };

  const orderSummary = calculateOrderSummary();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative w-full h-[30vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center"
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
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            Complete Your Booking
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg mt-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
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

      {/* Main Checkout Content */}
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
              step === "confirmation"
                ? "flex justify-center"
                : "lg:grid lg:grid-cols-3 lg:gap-8"
            }
          >
            {/* Checkout Form */}
            <div
              className={
                step === "confirmation" ? "w-full max-w-3xl" : "lg:col-span-2"
              }
            >
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
                      bookingNumber={`BK-${Math.floor(
                        100000 + Math.random() * 900000
                      )}`}
                      formData={{
                        guest: guestData,
                        payment: paymentData,
                      }}
                      orderSummary={orderSummary}
                      cartItems={cartItems}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Reservation Summary */}

            <div className="mt-10 lg:mt-0 ml-5">
              <ReservationSummary />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CheckoutFlow;
