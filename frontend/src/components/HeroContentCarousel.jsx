import React, { useState, useEffect, useRef } from "react";
import NavbarTop from "./NavbarTop";
import { Calendar, Users } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  "https://images.unsplash.com/photo-1571003123771-bd6a099dd83a",
  "https://images.unsplash.com/photo-1573663520878-8c38b10264fc",
];

export default function HeroContentCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isPausedRef = useRef(false); // Ref to track pause state

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
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

      {/* Image Carousel */}
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
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 max-w-3xl w-full text-center text-white">
        <p className=" font-['Playfair_Display'] text-6xl p-5">
          Welcome to Royal Grand
        </p>
        <p className="font-['Playfair_Display'] text-4xl p-5 ">
          Hotels & Resorts
        </p>
      </div>

      {/* Booking Form */}
      <div className=" absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 p-6 shadow-lg max-w-6xl w-full">
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
          <div>
            <label
              htmlFor="check-in"
              className="text-[#8E7037] text-2xl font-medium mb-2 flex items-center"
            >
              <Calendar size={30} className="mr-2 text-gold" />
              Check In
            </label>
            <input
              type="date"
              className="w-full border border-[#8E7037] px-3 py-2 text-xl text-gray-600"
            />
          </div>
          <div>
            <label
              htmlFor="check-out"
              className="text-[#8E7037] text-2xl font-medium mb-2 flex items-center"
            >
              <Calendar size={30} className="mr-2 text-gold" />
              Check Out
            </label>
            <input
              type="date"
              className="w-full border border-[#8E7037] px-3 py-2 text-xl text-gray-600"
            />
          </div>
          <div>
            <label
              htmlFor="guests"
              className="text-[#8E7037] text-2xl font-medium mb-2 flex items-center"
            >
              <Users size={30} className="mr-2 text-gold" />
              Adult
            </label>
            <input
              type="number"
              min="1"
              className="w-full border border-[#8E7037] px-3 py-2 text-xl text-gray-600"
              defaultValue={1}
            />
          </div>
          <div>
            <label
              htmlFor="guests"
              className="text-[#8E7037] text-2xl font-medium mb-2 flex items-center"
            >
              <Users size={30} className="mr-2 text-gold" />
              Child
            </label>
            <input
              type="number"
              min="0"
              className="w-full border border-[#8E7037] px-3 py-2 text-xl text-gray-600"
              defaultValue={0}
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <button
              type="submit"
              className="w-full bg-[#8E7037] text-white text-2xl px-4 py-2 border border-transparent  hover:border-[#8E7037] hover:text-[#8E7037] hover:bg-white/80 transition"
            >
              Check Availability
            </button>
          </div>
        </form>
      </div>

      {/* Prev & Next Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-800 p-3 border border-white shadow-md hover:bg-white/75 transition"
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
        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-800 p-3 border border-white shadow-md hover:bg-white/75 transition"
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

      {/* Dot Indicators */}
      <div className="absolute bottom-6 w-full flex justify-center items-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-[#8E7037] scale-125" : "bg-white/70"
              }`}
          ></button>
        ))}
      </div>

      {/* Pause Auto Slide on Navbar Hover */}
      <div
        className="absolute top-0 left-0 w-full h-20 z-10"
        onMouseEnter={() => (isPausedRef.current = true)}
        onMouseLeave={() => (isPausedRef.current = false)}
      ></div>
    </div>
  );
}
