import React, { useEffect, useState } from "react";
import axios from "axios";

function BookingDetails({ bookingReference }) {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (!bookingReference) return;

    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5005/bookings/${bookingReference}`,
          {
            headers: { token },
          }
        );
        setBooking(response.data.booking);
      } catch (error) {
        console.error("Error fetching booking:", error);
        setErrorMsg("No booking found or failed to fetch booking.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingReference]);

  if (loading) return <div className="text-center py-6">Loading...</div>;
  if (errorMsg) return <div className="text-red-600 text-center">{errorMsg}</div>;
  if (!booking) return <div>No booking data available.</div>;

  return (
    

    <div className="bg-white shadow-md p-6 sticky top-8 space-y-6">
      
    <h2 className="text-2xl font-bold mb-4">
      Booking Reference: {booking.bookingReference}
    </h2>

    <div className="mb-4">
      <p><strong>Payment Method:</strong> {booking.payment.method}</p>
      <p><strong>Transaction ID:</strong> {booking.payment.transactionId}</p>
    </div>

    <div className="mb-4">
      <h3 className="font-semibold mb-2">Cart Items:</h3>
      {booking.cartItems?.map((item, index) => (
        <div key={index} className="border p-2 mb-2 rounded">
          <p><strong>Title:</strong> {item.title}</p>
          <p><strong>Price:</strong> ${item.price}</p>
          <p><strong>Quantity:</strong> {item.quantity}</p>
          <p><strong>Total Price:</strong> ${item.totalPrice}</p>
        </div>
      ))}
    </div>

    <div className="mt-4">
      <p><strong>Subtotal:</strong> ${booking.subtotal}</p>
      <p><strong>Taxes:</strong> ${booking.taxes}</p>
      <p><strong>Total:</strong> ${booking.total}</p>
      <p><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
    </div>
  </div>
  );
}

export default BookingDetails;
