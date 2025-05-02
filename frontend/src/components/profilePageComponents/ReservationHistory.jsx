import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Hotel,
  Bed,
  Users,
  Calendar,
} from "lucide-react";

const ReservationHistory = ({ guest }) => {
  const [expandedBookings, setExpandedBookings] = useState({});
  const [visibleCount, setVisibleCount] = useState(2); // Track visible bookings
  const [loading, setLoading] = useState(false); // Track loading state
  const [sortOrder, setSortOrder] = useState("latest"); // Track sorting order (latest or oldest)

  const toggleExpand = (id) => {
    setExpandedBookings((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShowMore = () => {
    setLoading(true); // Start loading
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + 2); // Show 2 more bookings
      setLoading(false); // Stop loading after 1 second
    }, 1000);
  };

  // Function to sort bookings based on the sortOrder
  const sortedBookings = [...guest.bookings].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="space-y-6">
      {/* Sort Order Selector */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() =>
            setSortOrder(sortOrder === "latest" ? "oldest" : "latest")
          }
          className="text-[#8E7037] font-semibold hover:text-gray-700 transition-colors"
        >
          Sort by: {sortOrder === "latest" ? "Oldest" : "Latest"}
        </button>
      </div>

      {sortedBookings.slice(0, visibleCount).map((booking) => {
        const isExpanded = expandedBookings[booking._id];
        const bookingDate = new Date(booking.createdAt);

        return (
          <div
            key={booking._id}
            className="bg-white overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            {/* Booking Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-[#8E7037]">
              <div className="flex flex-wrap justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-[#8E7037]">
                    Booking #{booking.bookingReference}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {bookingDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <span className="text-[#8E7037] px-3 py-1 font-semibold">
                  Total: ${booking.total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Booking Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Payment Method
                  </p>
                  <p className="text-gray-700">{booking.payment.method}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Transaction ID
                  </p>
                  <p className="text-gray-700 truncate">
                    {booking.payment.transactionId}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Price Breakdown
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-gray-700">
                      Subtotal: ${booking.subtotal.toFixed(2)}
                    </span>
                    <span className="text-gray-500">+</span>
                    <span className="text-gray-700">
                      Taxes: ${booking.taxes.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expand/Collapse Button */}
              <button
                onClick={() => toggleExpand(booking._id)}
                className="w-full flex gap-2 py-2 px-4 mt-3 text-[#8E7037] hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">
                  {isExpanded ? "Hide Booked Items" : "Show Booked Items"}
                </span>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              {/* Expandable Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="my-4 border-t border-gray-200" />

                    <div className="space-y-4">
                      {booking.cartItems.map((item, idx) => {
                        const isRoom = !!item.arrivalDate;
                        const icon = isRoom ? (
                          <Bed className="h-5 w-5 text-[#8E7037]" />
                        ) : (
                          <Calendar className="h-5 w-5" />
                        );

                        return (
                          <div
                            key={idx}
                            className="bg-white p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start gap-3">
                              <div className="bg-gray-100 text-[#8E7037] p-2 rounded-full">
                                {icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <h4 className="font-medium text-gray-800">
                                    {item.arrivalDate ? (
                                      <span className="text-sm text-gray-500 mr-2">
                                        Room Name:
                                      </span>
                                    ) : (
                                      <span className="text-sm text-gray-500 mr-2">
                                        Event Name:
                                      </span>
                                    )}
                                    {item.title || item.slug
                                      ? (item.title || item.slug)
                                          .charAt(0)
                                          .toUpperCase() +
                                        (item.title || item.slug)
                                          .slice(1)
                                          .toLowerCase()
                                      : ""}
                                  </h4>

                                  <p className="font-semibold text-[#8E7037]">
                                    ${item.totalPrice.toFixed(2)}
                                  </p>
                                </div>

                                {!isRoom ? (
                                  <p className="text-sm text-gray-500 mt-1">
                                    Number of Tickets: {item.quantity}
                                  </p>
                                ) : (
                                  <p className="text-sm text-gray-500 mt-1">
                                    Number of Rooms: {item.quantity}
                                  </p>
                                )}

                                {isRoom && (
                                  <div className="mt-3 pt-3 border-t border-gray-100">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                      {/* Check-in Date */}
                                      <div className="flex items-center gap-2">
                                        <Bed className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">
                                          Check-in: {item.arrivalDate}
                                        </span>
                                      </div>

                                      {/* Check-out Date */}
                                      <div className="flex items-center gap-2">
                                        <Bed className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">
                                          Check-out: {item.departureDate}
                                        </span>
                                      </div>

                                      <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">
                                          {item.numAdults}{" "}
                                          {item.numAdults === 1
                                            ? "Adult"
                                            : "Adults"}
                                          {item.numChildren
                                            ? `, ${item.numChildren} ${
                                                item.numChildren === 1
                                                  ? "Child"
                                                  : "Children"
                                              }`
                                            : ""}
                                        </span>
                                      </div>

                                      {item.nights && (
                                        <div className="flex items-center gap-2">
                                          <Hotel className="h-4 w-4 text-gray-400" />
                                          <span className="text-sm text-gray-600">
                                            {item.nights}{" "}
                                            {item.nights === 1
                                              ? "Night"
                                              : "Nights"}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}

      {/* Show More Button */}
      {guest.bookings.length > visibleCount && (
        <div className="text-center mt-4">
          {loading ? (
            <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-[#8E7037] rounded-full mx-auto"></div>
          ) : (
            <button
              onClick={handleShowMore}
              className="text-[#8E7037] font-semibold hover:text-[#8E7037] transition-colors"
            >
              Show More Reservations
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ReservationHistory;
