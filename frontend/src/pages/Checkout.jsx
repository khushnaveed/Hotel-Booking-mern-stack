import React from 'react';

export default function Checkout() {
    return (
        <div
            className="h-screen w-full bg-cover bg-center flex items-center justify-center px-4"
            style={{
                backgroundImage:
                    "url('https://img.freepik.com/premium-photo/abstract-blur-defocused-hotel-lobby-interior-background-vintage-filter_875825-64135.jpg')",
            }}
        >
            <div className="p-6 rounded-xl shadow-lg max-w-xl text-center">
                <div className="relative text-white text-center">
                    <h1 className="text-5xl font-bold uppercase"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>ROYAL GRAND</h1>
                    <h4 className="text-xl font-bold uppercase"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>Checkout</h4>
                    <p>booking information:

                    </p>
                    <h3>checkin date:</h3>
                    <h3>checkout date:</h3>
                    <p>total price:</p>

                </div>
            </div>
        </div>
    );
}


/* import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
//npm install react-responsive-carousel

import "react-responsive-carousel/lib/styles/carousel.min.css";

const Checkout = () => {
    const location = useLocation();
    const bookingInfo = location.state;

    const [summary, setSummary] = useState(null);
    const [roomDetails, setRoomDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch summary for price calculation
    useEffect(() => {
        const fetchSummary = async () => {
            try {
                if (!bookingInfo) throw new Error("No booking information provided.");
                const res = await axios.post("http://localhost:5005/room/checkout", bookingInfo);
                setSummary(res.data.data);
            } catch (err) {
                console.error("Checkout error:", err);
                setError("Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (bookingInfo) {
            fetchSummary();
        } else {
            setError("Booking information is missing.");
            setLoading(false);
        }
    }, [bookingInfo]);

    // Fetch room details by slug
    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5005/api/room/${bookingInfo.slug}`);
                setRoomDetails(res.data.data);
            } catch (err) {
                console.error("Error fetching room details:", err);
            }
        };

        if (bookingInfo?.slug) {
            fetchRoomDetails();
        }
    }, [bookingInfo]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleBooking = async () => {
        try {
            const bookingData = {
                roomSlug: bookingInfo.slug,
                arrivalDate: summary.arrivalDate,
                departureDate: summary.departureDate,
                numAdults: summary.numAdults,
                numChildren: summary.numChildren,
                totalPrice: summary.totalPrice,
                selectedPackages: summary.selectedPackages,
            };
            console.log("Booking Data:", bookingData); // Log booking data for debugging
            const response = await axios.post('http://localhost:5005/api/room/book', bookingData);
            alert('Booking successful!');
        } catch (err) {
            console.error('Booking error:', err.response || err);
            alert('Something went wrong, please try again.');
        }
    };

    if (loading) return <p>Loading summary...</p>;
    if (error) return <p>{error}</p>;
    if (!summary || !roomDetails) return <p>No summary or room details available.</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto flex flex-col items-center space-y-6 mt-8">
            <h1 className="text-2xl font-bold mb-4">Checkout Summary</h1>

            {roomDetails.images?.length > 0 && (
                <Carousel showThumbs={false} className="mb-6 rounded-xl overflow-hidden max-w-full">
                    {roomDetails.images.map((img, i) => (
                        <div key={i}>
                            <img src={img} alt={`Room Image ${i + 1}`} className="w-full" />
                        </div>
                    ))}
                </Carousel>
            )}

            <div className="mb-4 w-full">
                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                <p>{roomDetails.descOverview}</p>
            </div>

            <div className="mb-4 space-y-1 w-full">
                <p><strong>Room:</strong> {summary.roomTitle}</p>
                <p><strong>Arrival Date:</strong> {formatDate(summary.arrivalDate)}</p>
                <p><strong>Departure Date:</strong> {formatDate(summary.departureDate)}</p>
                <p><strong>Adults:</strong> {summary.numAdults}</p>
                <p><strong>Children:</strong> {summary.numChildren}</p>
                <p><strong>Total Price:</strong> ${summary.totalPrice}</p>
            </div>

            {summary.selectedPackages?.length > 0 && (
                <div className="mb-4 w-full">
                    <h2 className="text-xl font-semibold mb-1">Selected Packages</h2>
                    <ul className="list-disc list-inside">
                        {summary.selectedPackages.map((pkg, i) => (
                            <li key={i}>{pkg}</li>
                        ))}
                    </ul>
                </div>
            )}

            {roomDetails.packages?.length > 0 && (
                <div className="mb-4 w-full">
                    <h2 className="text-xl font-semibold mb-1">Available Packages</h2>
                    <ul className="list-disc list-inside">
                        {roomDetails.packages.map((pkg, i) => (
                            <li key={i}>{pkg}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="mt-6 w-full flex justify-center">
                <button
                    onClick={handleBooking}
                    className="px-6 py-2 bg-[#8E7037] text-white font-semibold rounded hover:bg-white hover:text-[#8E7037] border border-[#8E7037] transition duration-200"
                >
                    Confirm Booking
                </button>
            </div>
        </div>
    );
};

export default Checkout;
 */