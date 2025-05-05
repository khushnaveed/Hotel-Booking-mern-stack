import React, { useEffect, useState } from "react";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
            token: localStorage.getItem("token"),
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch bookings.");
        }

        const bookingList = data.booking || [];
        setBookings(bookingList);
        setFilteredBookings(bookingList);
        console.log(bookingList);
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

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="overflow-x-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 px-4 sm:px-0">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
          <p className="text-sm font-medium text-gray-500">Total Bookings</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            {bookings.length}
          </p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search by reference, method, transaction or item title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
      />

      <table className="min-w-full bg-white border border-gray-300 shadow-sm">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-2 border">Reference</th>
            <th className="p-2 border">Payment Method</th>
            <th className="p-2 border">Transaction ID</th>
            <th className="p-2 border">Subtotal</th>
            <th className="p-2 border">Taxes</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Reservations & Bookings </th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center p-4 text-gray-500">
                No bookings match your search.
              </td>
            </tr>
          ) : (
            filteredBookings.map((booking) => (
              <tr key={booking._id} className="border-t">
                <td className="p-2 border">{booking.bookingReference}</td>
                <td className="p-2 border">{booking.payment?.method}</td>
                <td className="p-2 border">{booking.payment?.transactionId}</td>
                <td className="p-2 border">${booking.subtotal.toFixed(2)}</td>
                <td className="p-2 border">${booking.taxes.toFixed(2)}</td>
                <td className="p-2 border font-semibold">
                  ${booking.total.toFixed(2)}
                </td>
                <td className="p-2 border">
                  <ul className="text-sm list-disc ml-4">
                    {booking.cartItems.map((item, idx) => (
                      <li key={idx}>
                        <strong>{item.title || item.slug}</strong> ×{" "}
                        {item.quantity} — ${item.totalPrice}
                        <div className="text-xs text-gray-600">
                          {item.arrivalDate && `Arrival: ${item.arrivalDate}, `}
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
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookings;
