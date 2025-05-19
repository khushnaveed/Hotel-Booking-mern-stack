import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Copy,
  User,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Info,
} from "lucide-react";
import { GuestContext } from "../../context/GuestContext";

const Confirmation = ({ bookingNumber, bookingDetails }) => {
  const { guest } = useContext(GuestContext);
  const [copied, setCopied] = useState(false);

  const { payment } = bookingDetails || {};

  const formattedDate = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bookingNumber);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const iconClass = "text-[#8E7037] mr-2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg p-8 max-w-3xl mx-auto  mt-40"
    >
      <div id="confirmation-content">
        <div className="text-center mb-8">
          <motion.div
            className="flex justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2, stiffness: 100 }}
          >
            <CheckCircle size={70} className="text-[#8E7037]" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600">
            Thank you for your reservation. We're looking forward to hosting
            you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 border-b pb-2">
              Guest Details
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <User className={iconClass} size={20} />
                <div>
                  <span className="font-semibold block">Guest</span>
                  <span className="text-gray-600">
                    {guest?.firstName} {guest?.lastName}
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className={iconClass} size={20} />
                <div>
                  <span className="font-semibold block">Address</span>
                  <span className="text-gray-600">
                    {guest?.address}, {guest?.city}, {guest?.zipcode},{" "}
                    {guest?.country}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 border-b pb-2">
              Contact Information
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className={iconClass} size={20} />
                <div>
                  <span className="font-semibold block">Phone</span>
                  <span className="text-gray-600">{guest?.phonenumber}</span>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className={iconClass} size={20} />
                <div>
                  <span className="font-semibold block">Email</span>
                  <span className="text-gray-600">{guest?.email}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 border-b pb-2">
            Payment Information
          </h3>
          <div className="flex items-start">
            <CreditCard className={iconClass} size={20} />
            <div>
              <span className="font-semibold block">{payment?.method}</span>
              <span className="text-gray-600">
                Transaction ID: {payment?.transactionId}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 mb-8 flex items-start">
          <Info size={20} className="text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-700">
              Important Information
            </h4>
            <p className="text-blue-800 text-sm mt-1">
              Check-in starts at 3:00 PM and checkout is by 12:00 PM.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">Booking date: {formattedDate}</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.print()}
              className="px-6 py-3 border border-[#8E7037] text-[#8E7037] font-medium hover:bg-[#8E7037] hover:text-white transition-all duration-300"
            >
              Print Confirmation
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/"
              className="px-6 py-3 bg-[#8E7037] text-white font-medium hover:bg-[#7a602f] transition-all duration-300 shadow-md"
            >
              Return to Home
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Confirmation;
