import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Confirmation from "./Confirmation";

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [bookingData, setBookingData] = useState(null);

  const sessionId = searchParams.get("session_id");
  const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:5005" : "";

  useEffect(() => {
    if (sessionId) {
      fetch(baseUrl + `/checkout-session/${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let order = {
            guestId: data.metadata.guestId,
            roomsBooking: Array(data.metadata.productIds.split(",").length)
              .fill(null)
              .map((item, index) => {
                return {
                  slug: data.metadata.slug.split(",")[index],
                  title: data.metadata.title.split(",")[index],
                  arrivalDate: data.metadata.arrivalDate.split(",")[index],
                  departureDate: data.metadata.departureDate.split(",")[index],
                  numAdults: data.metadata.numAdults.split(",")[index],
                  numChildren: data.metadata.numChildren.split(",")[index],
                  totalPrice: data.metadata.totalPrice.split(",")[index],
                  nights: data.metadata.nights.split(",")[index],
                };
              }),

            orderTotalAmount: +data.metadata.orderTotalAmount,
          };
          if (order.roomsBooking[0]["arrivalDate"]) {
            fetch(baseUrl + `/order`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
              },
              body: JSON.stringify(order),
            })
              .then((res) => res.json())
              .then((result) => console.log(result));
            setBookingData({
              bookingNumber: data.bookingReference,

              bookingDetails: {
                payment: {
                  method: data.payment_method_types?.[0],
                  transactionId: data.payment_intent,
                },
              },
            });
          } else {
            fetch(baseUrl + `/order-events`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
              },
              body: JSON.stringify(order),
            })
              .then((res) => res.json())
              .then((result) => console.log(result));
            setBookingData({
              bookingNumber: data.bookingReference,

              bookingDetails: {
                payment: {
                  method: data.payment_method_types?.[0],
                  transactionId: data.payment_intent,
                },
              },
            });
          }
        })
        .catch((err) => console.error("Failed to fetch session:", err));
    }
  }, [sessionId]);

  if (!bookingData) return <p>Loading confirmation...</p>;

  return (
    <Confirmation
      bookingNumber={bookingData.bookingNumber}
      bookingDetails={bookingData.bookingDetails}
    />
  );
}
