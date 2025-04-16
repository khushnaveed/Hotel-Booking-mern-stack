import React, { useState } from "react";
import { Bed, Users, Maximize, Check } from "lucide-react";

const HomePageRooms = () => {
  const rooms = [
    {
      id: 1,
      name: "Deluxe King Room",
      description:
        "Spacious room with a king-sized bed, modern amenities, and a stunning city view.",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      capacity: 2,
      size: 32,
      amenities: [
        "Free WiFi",
        "Breakfast Included",
        "Air Conditioning",
        "Flat-screen TV",
        "Mini Bar",
      ],
    },
    {
      id: 2,
      name: "Premium Suite",
      description:
        "Luxurious suite featuring a separate living area, premium amenities, and panoramic views.",
      price: 349,
      image:
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80",
      capacity: 4,
      size: 50,
      amenities: [
        "Free WiFi",
        "Breakfast Included",
        "Air Conditioning",
        "Flat-screen TV",
        "Mini Bar",
        "Bathtub",
        "City View",
      ],
    },
    {
      id: 3,
      name: "Executive Twin Room",
      description:
        "Elegant room with two twin beds, perfect for business travelers or friends traveling together.",
      price: 229,
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80",
      capacity: 2,
      size: 30,
      amenities: [
        "Free WiFi",
        "Breakfast Included",
        "Air Conditioning",
        "Flat-screen TV",
        "Work Desk",
      ],
    },
  ];

  const [activeRoom, setActiveRoom] = useState(rooms[0]);

  return (
    <section id="rooms" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-5xl">Rooms & Suites</h2>
          <p className="text-gray-500  m-4">
            Discover our collection of thoughtfully designed rooms and suites,
            each offering the perfect blend of comfort, style, and modern
            amenities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 ${activeRoom.id === room.id ? "ring-2 ring-[#8E7037]" : ""
                }`}
              onClick={() => setActiveRoom(room)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-[#8E7037] text-white px-4 py-2 text-sm font-medium">
                  ${room.price}
                  <span className="text-xs">/night</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-2">{room.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{room.description}</p>
                <div className="flex justify-between text-sm text-gray-500  mb-4">
                  <div className="flex items-center">
                    <Bed size={16} className="mr-1 text-[#8E7037]" />
                    <span>
                      {room.capacity} {room.capacity === 1 ? "Guest" : "Guests"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Maximize size={16} className="mr-1 text-[#8E7037]" />
                    <span>{room.size} m²</span>
                  </div>
                </div>
                <a href="#booking" className="w-full text-center ">
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePageRooms;
