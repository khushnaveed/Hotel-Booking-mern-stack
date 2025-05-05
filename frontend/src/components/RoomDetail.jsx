import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCurrency } from "../context/CurrencyContext.jsx";
import RoomGallery from "./roomDetailComponents/RoomGallery.jsx";
import RoomTabs from "./roomDetailComponents/RoomTabs.jsx";
import BookingForm from "./roomDetailComponents/BookingForm.jsx";
import { useCart } from "../context/CartContext";
import { useRoomDetail } from "../context/RoomDetailContext.jsx";
export default function RoomDetails() {

  const { roomData, setRoomData, bookingData, setBookingData } = useRoomDetail();
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { currency } = useCurrency();
  const currencySymbols = { USD: "$", EUR: "€", GBP: "£" };
  const calendarRef = useRef(null)
  const { addToCart } = useCart();

  const { roomSlug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:5005/room/${roomSlug}`);
        setRoomData(res.data.data);
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [roomSlug]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % roomData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? roomData.images.length - 1 : prev - 1
    );
  };

  const handleBookingClick = () => {
    const { arrive, departure, adult, child } = bookingData;

    if (!arrive || !departure) {
      alert("Please select both arrival and departure dates.");
      return;
    }

    const start = new Date(arrive);
    const end = new Date(departure);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (start < today || end < today) {
      alert("You can't book past dates.");
      return;
    }
    if (end <= start) {
      alert("Departure date must be after arrival date.");
      return;
    }

    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const basePrice = roomData.defaultPrice;
    const extraAdultFee = 70;
    const childFee = 30;
    const numAdults = parseInt(adult) || 1;
    const numChildren = parseInt(child) || 0;

    let totalPrice = basePrice * nights;
    if (numAdults > 2) {
      totalPrice += (numAdults - 2) * extraAdultFee * nights;
    }
    totalPrice += numChildren * childFee * nights;

    const payload = {
      slug: roomSlug,
      arrivalDate: arrive,
      departureDate: departure,
      numAdults,
      numChildren,
      selectedPackages: [],
      totalPrice,
      nights,
      image: roomData.images[0],
    };
    addToCart(payload);
    const token = localStorage.getItem("token");
    navigate(token ? "/checkout" : "/login");
    console.log("Token:", localStorage.getItem("token"));

  };
  if (loading) return <div>Loading...</div>;
  if (!roomData) return <div>Room information not found.</div>;

  return (
    <div className="relative" >
      <section
        className="relative top-0 left-0 w-full h-[80vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/src/assets/aboutHero.jpg')" }}
      >
        <div className="absolute inset-0 bg-opacity-30"></div>
        <div className="relative text-white text-center px-4 sm:px-6 md:px-10 pt-25">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            {roomData.title}
          </h1>
          <p
            className="text-lg mt-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            Royal Grand Hotel is where timeless elegance meets modern luxury in every detail.
          </p>
        </div>
      </section>

      <div >
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-6xl mx-auto m-5 ">


        {/* Room Gallery */}
        <RoomGallery
          images={roomData.images}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
        />
        {/* Booking Form */}
        <BookingForm
          bookingData={bookingData}
          setBookingData={setBookingData}
          roomData={roomData}
          handleBookingClick={handleBookingClick}
          currency={currency}
          currencySymbols={currencySymbols}
        />
      </div>
      {/* Room Tabs Section */}
      <div className="p-6 max-w-6xl mx-auto">
        <RoomTabs roomData={roomData} calendarRef={calendarRef} />
      </div>
    </div>

  );
}


