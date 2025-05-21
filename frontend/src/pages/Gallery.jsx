import React from "react";
import { galleryData } from "../assets/galleryData.js";
import HeroSection from "../components/HeroSection";

export default function Gallery() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <HeroSection
        title="Visual Elegance"
        subtitle={`Welcome to Royal Grand Gallery of Luxury`}
        backgroundImage="/galleryHero.jpg"
      />


      <div className="relative">

        <section className="py-25 px-6 md:px-0">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryData[0].items.map((item, index) => (
              <div className="overflow-hidden shadow-lg group" key={index}>
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-75 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="p-2 m-2">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-700">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>


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
