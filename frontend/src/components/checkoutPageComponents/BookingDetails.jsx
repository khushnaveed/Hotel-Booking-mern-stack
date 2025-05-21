import React, { useEffect, useState } from "react";
import axios from "axios";

function BookingDetails({ bookingReference }) {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:5005" : "";

  useEffect(() => {
    if (!bookingReference) return;

    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          baseUrl + `/bookings/${bookingReference}`,
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
  if (errorMsg)
    return <div className="text-red-600 text-center">{errorMsg}</div>;
  if (!booking) return <div>No booking data available.</div>;

  const { cartItems, subtotal, taxes, total, payment, createdAt } = booking;

  return (
    <div className="bg-white shadow-md p-6 space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Reservation Summary
      </h3>

      <div className="mb-4">
        {cartItems.map((item, index) => (
          <div key={index} className="flex gap-4 border-b pb-4 mb-4">
            <div className="text-sm flex-1">
              <p className="font-semibold capitalize">
                {item.slug.replace(/-/g, " ")}
              </p>
              {item.arrivalDate && item.departureDate ? (
                <>
                  <p>
                    {item.arrivalDate} to {item.departureDate}
                  </p>
                  <p>
                    {item.numAdults} Adults, {item.numChildren} Children
                  </p>
                </>
              ) : (
                <p>Total Tickets: {item.quantity}</p>
              )}
              <p className="text-[#8E7037] font-medium">
                ${item.totalPrice ? item.totalPrice.toFixed(2) : "0.00"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-gray-600 text-sm">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-gray-600 text-sm">
        <span>Taxes</span>
        <span>${taxes.toFixed(2)}</span>
      </div>

      <div className="border-t pt-4 flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span className="text-[#8E7037]">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default BookingDetails;
