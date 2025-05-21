
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bed } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext.jsx"
import { Link } from 'react-router-dom';

export default function HomePageRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRoom, setActiveRoom] = useState(null);
  const { currency } = useCurrency();
  const currencySymbols = { USD: "$", EUR: "€", GBP: "£" };
  const [expandedRoom, setExpandedRoom] = useState(null);
  const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:5005" : "";

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(baseUrl + "/room");
        const allRooms = response.data.data;

        const filtered = allRooms
          .filter(room => {
            const title = room.title.toLowerCase();
            return (
              title.includes('presidential') ||
              title.includes('luxury') ||
              title.includes('deluxe')
            );
          })
          .slice(0, 3);

        setRooms(filtered);
        setActiveRoom(filtered[0]);

      } catch (error) {
        console.error('Error fetching room data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, []);

  const handleReadMoreToggle = (roomId) => {
    setExpandedRoom((prevState) => (prevState === roomId ? null : roomId));
  };

  if (loading) return <div>Loading...</div>;
  if (!rooms.length) return <div>No matching rooms to show</div>;

  return (
    <section id="rooms" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-5xl">Rooms & Suites</h2>
          <p className="text-gray-500 m-4">
            Discover our collection of thoughtfully designed rooms and suites,
            each offering the perfect blend of comfort, style, and modern
            amenities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room._id}
              className={`bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 ${activeRoom?._id === room._id ? "ring-2 ring-[#8E7037]" : ""
                }`}
              onClick={() => setActiveRoom(room)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.images[0]}
                  alt={room.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-[#8E7037] text-white px-4 py-2 text-sm font-medium">
                  {currencySymbols[currency]} {room.defaultPrice}
                  <span className="text-xs">/night</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-2">{room.title}</h3>
                <p className="text-gray-500 text-sm mb-4">
                  {expandedRoom === room._id
                    ? room.descOverview
                    : `${room.descOverview.slice(0, 150)}...`}
                </p>
                <button
                  onClick={() => handleReadMoreToggle(room._id)}
                  className="text-blue-500 text-sm"
                >
                  {expandedRoom === room._id ? 'Read Less' : 'Read More'}
                </button>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Bed size={16} className="mr-1 text-[#8E7037]" />
                    <span>{room.additionalDetails.bed}</span>
                  </div>
                  <div className="flex items-center">
                    <span>{room.additionalDetails.maxPersons} {room.additionalDetails.maxPersons === 1 ? 'Guest' : 'Guests'}</span>
                  </div>
                </div>

                <Link
                  to={`/rooms/${room.slug}`}
                  className="inline-block mx-auto text-sm text-white bg-[#8E7037] border border-[#8E7037] px-4 py-2 hover:bg-white hover:text-[#8E7037] transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

}

