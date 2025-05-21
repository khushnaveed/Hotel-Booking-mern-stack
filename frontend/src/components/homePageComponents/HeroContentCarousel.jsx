import React, { useState, useEffect, useRef } from "react";
import NavbarTop from "../NavbarTop";
import { Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  "https://images.unsplash.com/photo-1571003123771-bd6a099dd83a",
  "https://images.unsplash.com/photo-1573663520878-8c38b10264fc",
];

export default function HeroContentCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isPausedRef = useRef(false);
  const navigate = useNavigate()

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:5005" : "";
  const handleCheckAvailability = async (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      alert("Please select both dates");
      return;
    }

    try {
      const response = await fetch(baseUrl + `/room/available?start=${checkIn}&end=${checkOut}`);
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        console.log("Available Rooms:", data.data);
        const firstAvailableRoom = data.data[0];
        console.log("First Room:", firstAvailableRoom); 
        navigate(`/rooms/${firstAvailableRoom.slug}#calendar`);
      } else {
        alert("No rooms available or something went wrong.");
      }
    } catch (err) {
      console.error("Error fetching availability:", err);
      alert("Server error.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPausedRef.current) {
        nextSlide();
      }
    }, 5000);



    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden z-0">
      <NavbarTop />

      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full flex-shrink-0 object-cover h-full"
          />
        ))}
      </div>
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 max-w-3xl w-full text-center text-white lg:mt-15">
        <p
          className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl p-5"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
        >
          Welcome to Royal Grand
        </p>
        <p
          className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl p-5"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
        >
          Hotels & Resorts
        </p>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 md:-translate-y-12 sm:-translate-y-1/2 bg-white/80 p-6 shadow-lg max-w-6xl w-full">
        <form className="grid grid-cols-2 gap-4 max-w-screen-sm sm:max-w-full mx-auto sm:grid-cols-2 lg:flex lg:items-center lg:justify-between lg:max-w-full">
          <div className="sm:col-span-1 lg:flex-1 lg:min-w-[150px]">
            <label
              htmlFor="check-in"
              className="text-[#8E7037] text-sm sm:text-base md:text-lg lg:text-xl font-medium mb-2 flex items-center"
            >
              <Calendar className="mr-2 text-gold w-4 h-4 sm:w-6 sm:h-6 lg:w-[30px] lg:h-[30px]" />
              Check In
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full border border-[#8E7037] px-2 py-2 text-xs sm:text-sm md:text-base text-gray-600"
            />
          </div>

          <div className="sm:col-span-1 lg:flex-1 lg:min-w-[150px]">
            <label
              htmlFor="check-out"
              className="text-[#8E7037] text-sm sm:text-base md:text-lg lg:text-xl font-medium mb-2 flex items-center"
            >
              <Calendar className="mr-2 text-gold w-4 h-4 sm:w-6 sm:h-6 lg:w-[30px] lg:h-[30px]" />
              Check Out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full border border-[#8E7037] px-2 py-2 text-xs sm:text-sm md:text-base text-gray-600"
            />
          </div>

          <div className="sm:col-span-1 lg:flex-1 lg:min-w-[150px]">
            <label
              htmlFor="adults"
              className="text-[#8E7037] text-sm sm:text-base md:text-lg lg:text-xl font-medium mb-2 flex items-center"
            >
              <Users className="mr-2 text-gold w-4 h-4 sm:w-6 sm:h-6 lg:w-[30px] lg:h-[30px]" />
              Adult
            </label>
            <input
              type="number"
              min="1"
              className="w-full border border-[#8E7037] px-2 py-2 text-xs sm:text-sm md:text-base text-gray-600"
              defaultValue={1}
            />
          </div>

          <div className="sm:col-span-1 lg:flex-1 lg:min-w-[150px]">
            <label
              htmlFor="children"
              className="text-[#8E7037] text-sm sm:text-base md:text-lg lg:text-xl font-medium mb-2 flex items-center"
            >
              <Users className="mr-2 text-gold w-4 h-4 sm:w-6 sm:h-6 lg:w-[30px] lg:h-[30px]" />
              Child
            </label>
            <input
              type="number"
              min="0"
              className="w-full border border-[#8E7037] px-2 py-2 text-xs sm:text-sm md:text-base text-gray-600"
              defaultValue={0}
            />
          </div>

          <div className="col-span-2 lg:flex-1 lg:min-w-[150px]">
            <button
              onClick={handleCheckAvailability}
              type="submit"
              className="w-full bg-[#8E7037] text-white text-sm sm:text-lg px-3 py-2 lg:px-7 lg:py-6 border border-transparent hover:border-[#8E7037] hover:text-[#8E7037] hover:bg-white transition"
            >
              Check Availability
            </button>
          </div>
        </form>
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-800 p-3 border border-white shadow-md hover:bg-white/75 transition hidden lg:block"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-800 p-3 border border-white shadow-md hover:bg-white/75 transition hidden lg:block"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-6 w-full flex justify-center items-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-[#8E7037] scale-125" : "bg-white/70"
            }`}
          ></button>
        ))}
      </div>

      <div
        className="absolute top-0 left-0 w-full h-20 z-10"
        onMouseEnter={() => (isPausedRef.current = true)}
        onMouseLeave={() => (isPausedRef.current = false)}
      ></div>
    </div>
  );
}
