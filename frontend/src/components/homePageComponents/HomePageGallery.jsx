
import React from "react";
import { Link } from "react-router-dom";

const HomePageGallery = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      title: "Swimming pool",
    },
    {
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      title: "Double Room",
    },
    {
      url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
      title: "Restaurant",
    },
    {
      url: "https://images.unsplash.com/photo-1576675784201-0e142b423952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1772&q=80",
      title: "Single Room",
    },
    {
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1760&q=80",
      title: "Panoramic Views",
    },
    {
      url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80",
      title: "Swimming View",
    },
  ];

  return (
    <section id="gallery" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title text-5xl">Explore Our Hotel</h2>
          <p className="text-gray-500 m-4">
            Take a visual journey through our luxurious spaces and amenities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <Link
              to="/gallery"
              onClick={() => window.scrollTo(0, 0)}
              key={index}
              className="group relative overflow-hidden block"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <h3 className="text-white text-xl">{image.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePageGallery;
