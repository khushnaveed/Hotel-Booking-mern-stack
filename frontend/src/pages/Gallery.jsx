import React from "react";
import { galleryData } from "../assets/galleryData.js"; // Adjust the path based on your file structure

export default function Gallery() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative top-0 left-0 w-full h-[80vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/src/assets/galleryHero.jpg')" }}>
        <div className="absolute inset-0 bg-opacity-40"></div>
        <div className="relative text-white text-center mt-10">
          <h1
            className="text-5xl font-bold uppercase"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            Visual Elegance
          </h1>
          <p
            className="text-lg mt-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            Welcome to Royal Grand Gallery of Luxury
          </p>
          <p
            className="text-lg mt-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            Step into the World of Luxurious Retreat
          </p>
        </div>
      </section>


      {/* Wrapper to avoid overlap */}
      <div className="relative">
        {/* Gallery Section */}
        <section className="py-16 px-6 md:px-0">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryData[0].items.map((item, index) => (
              <div className="overflow-hidden shadow-lg group" key={index}>
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-72 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="p-2">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-700">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 bg-yellow-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition duration-300"
        title="Back to Top"
      >
        ↑
      </button>
    </>
  );
}
