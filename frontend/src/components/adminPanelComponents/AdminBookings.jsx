import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import {
  CalendarDays,
  Users,
  User,
  Baby,
  DollarSign,
} from "lucide-react";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);

  const formatDate = (iso) =>
    new Date(iso).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please log in.");

        const response = await fetch("http://localhost:5005/bookings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token,
          },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch bookings.");

        const bookingList = data.booking || [];
        setBookings(bookingList);
        setFilteredBookings(bookingList);
      } catch (err) {
        setError(err.message || "Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();

    const filtered = bookings.filter((booking) => {
      const refMatch = booking.bookingReference?.toLowerCase().includes(lowerSearch);
      const methodMatch = booking.payment?.method?.toLowerCase().includes(lowerSearch);
      const transactionMatch = booking.payment?.transactionId?.toLowerCase().includes(lowerSearch);
      const itemMatch = booking.cartItems?.some((item) =>
        item.title?.toLowerCase().includes(lowerSearch)
      );
      return refMatch || methodMatch || transactionMatch || itemMatch;
    });

    setFilteredBookings(filtered);
  }, [searchTerm, bookings]);

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.total || 0), 0);

  return (
    <div className="overflow-x-auto p-4 bg-gray-50">
      {/* Summary Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 px-4 sm:px-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow p-6 border-l-4 border-[#8E7037]"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p className="text-sm font-medium text-gray-500">Total Bookings</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            <CountUp end={bookings.length} duration={1.5} />
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow p-6 border-l-4 border-[#8E7037]"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p className="text-sm font-medium text-gray-500">Total Revenue</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            <CountUp end={totalRevenue} duration={1.5} prefix="$" separator="," decimals={2} />
          </p>
        </motion.div>
      </motion.div>

      {/* Search Input */}
      <motion.input
        type="text"
        placeholder="Search by reference, method, transaction ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 bg-white rounded w-full max-w-md"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      />

      {/* Booking Table */}
      <div className="overflow-x-auto">
        <div className="min-w-[1100px]">
          <div className="grid grid-cols-8 gap-2 bg-[#f8efe0] text-[#8E7037] font-semibold px-4 py-3 rounded-t-lg mb-2 text-sm">
            <span>Reference</span>
            <span>Payment Method</span>
            <span>Transaction ID</span>
            <span>Subtotal</span>
            <span>Taxes</span>
            <span>Total</span>
            <span>Created At</span>
            <span className="text-center">Bookings</span>
          </div>

          <AnimatePresence>
            {filteredBookings.length === 0 ? (
              <motion.div
                className="text-center p-4 text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No bookings match your search.
              </motion.div>
            ) : (
              filteredBookings.map((booking, index) => {
                const isExpanded = expandedRows.includes(booking._id);
                return (
                  <motion.div
                    key={booking._id}
                    className="grid grid-cols-8 gap-2 bg-white p-4 mb-2 rounded-lg shadow text-sm relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span>{booking.bookingReference}</span>
                    <span>{booking.payment?.method}</span>
                    <span>{booking.payment?.transactionId}</span>
                    <span>${booking.subtotal?.toFixed(2)}</span>
                    <span>${booking.taxes?.toFixed(2)}</span>
                    <span>${booking.total?.toFixed(2)}</span>
                    <span>{formatDate(booking.createdAt)}</span>

                    <div className="text-center">
                      <button
                        onClick={() => toggleRow(booking._id)}
                        className="text-[#8E7037] hover:underline focus:outline-none"
                      >
                        {isExpanded ? "Hide Details" : "Show Details"}
                      </button>
                    </div>

                    {isExpanded && (
                      <motion.div
                        className="col-span-8 mt-3 bg-gray-50 rounded-lg p-4 text-sm text-gray-800 border border-gray-200"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {booking.cartItems.map((item, idx) => (
                            <div
                              key={idx}
                              className="bg-white p-4 rounded-md shadow-sm border border-gray-100"
                            >
                              <h4 className="font-semibold text-[#8E7037] text-base mb-2">
                                {item.title || item.slug}
                              </h4>
                              <div className="space-y-2 text-gray-600">
                                <div className="flex items-center gap-2">
                                  <DollarSign size={16} className="text-[#8E7037]" />
                                  <span className="font-medium">Price:</span> ${item.totalPrice}
                                </div>

                                {/* Dynamically changing label for quantity */}
                                <div className="flex items-center gap-2">
                                  <Users size={16} className="text-[#8E7037]" />
                                  <span className="font-medium">
                                    {item.arrivalDate ? "Number of Rooms" : "Number of Tickets"}:
                                  </span>{" "}
                                  {item.quantity}
                                </div>

                                {item.arrivalDate && (
                                  <div className="flex items-center gap-2">
                                    <CalendarDays size={16} className="text-[#8E7037]" />
                                    <span className="font-medium">Arrival:</span> {item.arrivalDate}
                                  </div>
                                )}
                                {item.departureDate && (
                                  <div className="flex items-center gap-2">
                                    <CalendarDays size={16} className="text-[#8E7037]" />
                                    <span className="font-medium">Departure:</span>{" "}
                                    {item.departureDate}
                                  </div>
                                )}
                                {item.numAdults !== undefined && (
                                  <div className="flex items-center gap-2">
                                    <User size={16} className="text-[#8E7037]" />
                                    <span className="font-medium">Adults:</span> {item.numAdults}
                                  </div>
                                )}
                                {item.numChildren !== undefined && (
                                  <div className="flex items-center gap-2">
                                    <Baby size={16} className="text-[#8E7037]" />
                                    <span className="font-medium">Children:</span> {item.numChildren}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
