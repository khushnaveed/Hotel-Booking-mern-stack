import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCurrency } from "../context/CurrencyContext.jsx";
import HeroSection from "../components/HeroSection";

export default function Rooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]); // Initialize the rooms state
  const [error, setError] = useState(""); // For storing error messages
  const [loading, setLoading] = useState(true); // For loading state
  const { currency } = useCurrency();
  const currencySymbols = { USD: "$", EUR: "€", GBP: "£" };
  const [expandedRoom, setExpandedRoom] = useState(null);
  // Fetch room data from the backend when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5005/room") // API endpoint to get room data
      .then((res) => {
        setRooms(res.data.data); // Set rooms data in state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        setError("Error fetching rooms, please try again later."); // Handle error
        setLoading(false); // Set loading to false on error
        console.error("Error fetching rooms:", err);
      });
  }, []);
  const handleReadMoreToggle = (roomId) => {
    setExpandedRoom((prevState) => (prevState === roomId ? null : roomId));
  };
  if (loading) {
    return <p>Loading rooms...</p>; // Show a loading message while data is being fetched
  }

  return (
    <>
      <HeroSection
        title="Rooms"
        subtitle="Experience comfort and elegance in every stay. Discover your perfect room today."
        backgroundImage="/src/assets/heroImage.jpg"
      />

      <div className="mt-[5vh] md:mt-[5vh] lg:mt-[5vh] mb-1 flex flex-row flex-wrap gap-4 justify-center items-center">
        {error && <p className="text-red-600">{error}</p>}{" "}
        {/* Show error message if any */}
        {rooms.length > 0 ? (
          rooms.map((room, index) => (
            <div
              key={room._id}
              className="relative overflow-hidden group sm:w-[80%] m-5"
            >
              <img
                src={room.images?.[0] || "/fallback-image.jpg"} // Use the first image from the room data, or a fallback image
                alt={room.title}
                className="transition-all duration-300 transform group-hover:scale-120 object-cover w-full h-130 group-hover:filter group-hover:brightness-75"
              />
              <div
                className={`absolute top-0 ${
                  index % 2 === 0 ? "left-0" : "right-0"
                } h-full w-[90%] sm:w-[60%] md:w-[40%] 
  text-white p-4 pt-14 pl-6 flex flex-col z-10`}
                style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
              >
                <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
                  {room.title}
                </h1>
                <h6 className="text-sm sm:text-base md:text-lg text-[#bfa76e] mt-2">
                  Start from {currencySymbols[currency]}
                  {room.defaultPrice} per day
                </h6>

                <p
                  className={`mt-4 ${
                    expandedRoom === room._id ? "text-[12px]" : ""
                  }`}
                >
                  {expandedRoom === room._id
                    ? room.descOverview
                    : `${room.descOverview.slice(0, 200)}...`}
                </p>

                <button
                  onClick={() => handleReadMoreToggle(room._id)}
                  className="text-blue-500 text-sm mt-2"
                >
                  {expandedRoom === room._id ? "Read Less" : "Read More"}
                </button>

                <ul className="hidden lg:block  list-disc pl-5 mt-4 text-sm sm:text-base md:text-lg">
                  <li>Max: 4 Person(s)</li>
                  <li>Size: 35 m2 / 376 ft2</li>
                  <li>View: Ocean</li>
                  <li>Bed: King-size or twin beds</li>
                </ul>

                <button
                  onClick={() => navigate(`/rooms/${room.slug}`)}
                  className="px-4 sm:px-6 py-2 sm:pb-2 pb-4 text-sm sm:text-base 
               bg-[#8E7037] font-semibold text-white 
               hover:bg-white hover:text-[#8E7037] 
               border-2 border-[#8E7037] w-max mt-4 ml-2 sm:ml-6  
"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No rooms available at the moment.</p> // Show a message if no rooms are fetched
        )}
      </div>
    </>
  );
}
