import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCurrency } from "../context/CurrencyContext.jsx";
import RoomGallery from "./roomDetailComponents/RoomGallery.jsx";
import RoomTabs from "./roomDetailComponents/RoomTabs.jsx";
import BookingForm from "./roomDetailComponents/BookingForm.jsx";
import { useCart } from "../context/CartContext";
import { useRoomDetail } from "../context/RoomDetailContext.jsx";
import HeroSection from "../components/HeroSection";

export default function RoomDetails() {
  const { roomData, setRoomData, bookingData, setBookingData } =
    useRoomDetail();
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { currency, conversionRates } = useCurrency();
  const currencySymbols = { USD: "$", EUR: "€", GBP: "£" };
  const calendarRef = useRef(null);
  const { addToCart } = useCart();
  const { roomSlug } = useParams();
  const navigate = useNavigate();
  const baseUrl =
    import.meta.env.MODE === "development" ? "http://localhost:5005" : "";

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(baseUrl + `/room/${roomSlug}`);
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
    totalPrice *= conversionRates[currency];
    const payload = {
      _id: roomData._id,
      slug: roomSlug,
      title: roomData.title,
      arrivalDate: arrive,
      departureDate: departure,
      numAdults,
      numChildren,

      totalPrice,
      nights,
      images: [roomData.images[0]],
    };
    addToCart(payload);
    const token = localStorage.getItem("token");
    navigate(token ? "/checkout" : "/login");
    console.log("Token:", localStorage.getItem("token"));
  };
  if (loading) return <div>Loading...</div>;
  if (!roomData) return <div>Room information not found.</div>;

  return (
    <div className="relative overflow-x-hidden w-full">
      <HeroSection
        title={roomData.title}
        subtitle=" Royal Grand Hotel is where timeless elegance meets modern luxury in every detail."
        backgroundImage="/aboutHero.jpg"
      />


      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-4">

        <RoomGallery
          images={roomData.images}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
        />
        <BookingForm
          bookingData={bookingData}
          setBookingData={setBookingData}
          roomData={roomData}
          handleBookingClick={handleBookingClick}
          currency={currency}
          currencySymbols={currencySymbols}
        />
      </div>
      <div className="p-6 max-w-6xl mx-auto">
        <RoomTabs roomData={roomData} calendarRef={calendarRef} />
      </div>
    </div>
  );
}
