import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Confirmation from "./Confirmation";

export default function SuccessPage() {
    const [searchParams] = useSearchParams();
    const [bookingData, setBookingData] = useState(null);

    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        if (sessionId) {
            fetch(`http://localhost:5005/checkout-session/${sessionId}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setBookingData({
                        bookingNumber: data.bookingReference,

                        bookingDetails: {
                            payment: {
                                method: data.payment_method_types?.[0],
                                transactionId: data.payment_intent,
                            },
                        },
                    });
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
