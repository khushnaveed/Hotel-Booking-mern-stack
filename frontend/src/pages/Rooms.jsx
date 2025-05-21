
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCurrency } from "../context/CurrencyContext.jsx";
import HeroSection from "../components/HeroSection.jsx";
import RoomList from "../components/roomComponents/RoomList.jsx";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedRoom, setExpandedRoom] = useState(null);
  const { currency } = useCurrency();

  const currencySymbols = { USD: "$", EUR: "€", GBP: "£" };
  const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:5005" : "";
  useEffect(() => {
    axios
      .get(baseUrl + "/room")
      .then((res) => {
        setRooms(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching rooms, please try again later.");
        setLoading(false);
        console.error("Error fetching rooms:", err);
      });
  }, []);

  const handleReadMoreToggle = (roomId) => {
    setExpandedRoom((prev) => (prev === roomId ? null : roomId));
  };

  if (loading) return <p>Loading rooms...</p>;

  return (
    <>
      <HeroSection
        title="Rooms"
        subtitle="Experience comfort and elegance in every stay. Discover your perfect room today."
        backgroundImage="/heroImage.jpg"
      />
      <div className="mt-[5vh] mb-1 flex flex-row flex-wrap gap-4 justify-center items-center">
        {error && <p className="text-red-600">{error}</p>}
        {rooms.length > 0 ? (
          <RoomList
            rooms={rooms}
            currency={currency}
            currencySymbols={currencySymbols}
            expandedRoom={expandedRoom}
            onToggle={handleReadMoreToggle}
          />
        ) : (
          <p>No rooms available at the moment.</p>
        )}
      </div>
    </>
  );
}

























