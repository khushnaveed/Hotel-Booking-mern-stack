import React, { useEffect, useState } from "react";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);

  // Format ISO date string
  const formatDate = (iso) =>
    new Date(iso).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch("http://localhost:5005/bookings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch bookings.");
        }

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
      const refMatch = booking.bookingReference
        ?.toLowerCase()
        .includes(lowerSearch);
      const methodMatch = booking.payment?.method
        ?.toLowerCase()
        .includes(lowerSearch);
      const transactionMatch = booking.payment?.transactionId
        ?.toLowerCase()
        .includes(lowerSearch);
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

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + (booking.total || 0),
    0
  );

  return (
    <div className="overflow-x-auto p-4 bg-gray-50">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 px-4 sm:px-0">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#8E7037]">
          <p className="text-sm font-medium text-gray-500">Total Bookings</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            {bookings.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#8E7037]">
          <p className="text-sm font-medium text-gray-500">Total Revenue</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            ${totalRevenue}
          </p>
        </div>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by reference, method, transaction ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 bg-white rounded w-full max-w-md"
      />

      {/* Booking Table */}
      <div className="overflow-x-auto">
        <div className="min-w-[1100px]">
          {/* Table Header */}
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

          {/* Table Body */}
          {filteredBookings.length === 0 ? (
            <div className="text-center p-4 text-gray-500">
              No bookings match your search.
            </div>
          ) : (
            filteredBookings.map((booking) => {
              const isExpanded = expandedRows.includes(booking._id);
              return (
                <div
                  key={booking._id}
                  className="grid grid-cols-8 gap-2 bg-white p-4 mb-2 rounded-lg shadow text-sm relative"
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
                    <div className="col-span-8 mt-3 bg-gray-50 rounded p-3 text-xs text-gray-700">
                      <ul className="list-disc ml-4 space-y-1">
                        {booking.cartItems.map((item, idx) => (
                          <li key={idx}>
                            <strong>{item.title || item.slug}</strong> ×{" "}
                            {item.quantity} — ${item.totalPrice}
                            <div className="text-gray-600">
                              {item.arrivalDate &&
                                `Arrival: ${item.arrivalDate}, `}
                              {item.departureDate &&
                                `Departure: ${item.departureDate}, `}
                              {item.numAdults !== undefined &&
                                `Adults: ${item.numAdults}, `}
                              {item.numChildren !== undefined &&
                                `Children: ${item.numChildren}`}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
