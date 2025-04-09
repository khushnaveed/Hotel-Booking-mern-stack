import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function RoomDetails() {
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { roomSlug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:5005/room/${roomSlug}`);
        setRoomData(res.data.data);
      } catch (error) {
        console.error('Error fetching room:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomSlug]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % roomData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? roomData.images.length - 1 : prev - 1
    );
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    navigate(`/checkout/${roomSlug}`);
  };

  if (loading) return <div>Loading...</div>;
  if (!roomData) return <div>Room not found</div>;

  return (
    <div className="relative">
      {/* Hero Section */}
      <section
        className="absolute top-0 left-0 w-full h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/src/assets/aboutHero.jpg')" }}
      >
        <div className="absolute inset-0 bg-opacity-40"></div>
        <div className="relative text-white text-center px-4 sm:px-6 md:px-10">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            {roomData.title}
          </h1>
          <p
            className="text-base sm:text-lg mt-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            Lorem Ipsum is simply dummy text of the printing
          </p>
        </div>
      </section>

      <div className="pt-[40vh] md:pt-[40vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-6xl mx-auto">
          {/* Image Gallery */}
          <div>
            <div className="relative">
              <img
                src={roomData.images[currentImageIndex]}
                alt="Room"
                className="w-full h-[400px] object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 p-1 rounded-full shadow"
              >
                ⬅
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 p-1 rounded-full shadow"
              >
                ➡
              </button>
            </div>

            <div className="flex mt-4 space-x-2">
              {roomData.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  className={`w-20 h-16 object-cover cursor-pointer border ${index === currentImageIndex
                    ? "border-text-[#8E7037]"
                    : "border-gray-300"
                    }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-gray-100 p-6 shadow-lg h-fit">
            <h5 className="text-xl font-semibold mb-4">
              STARTING ROOM FROM{" "}
              <strong className="text-[#8E7037]">${roomData.defaultPrice}/day</strong>
            </h5>
            <form className="space-y-4" onSubmit={handleBookingSubmit}>
              <div>
                <label>ARRIVE</label>
                <input type="date" name="arrive" className="w-full p-2 bg-white placeholder-gray-400 text-gray-700" />
              </div>
              <div>
                <label>DEPARTURE</label>
                <input
                  type="date"
                  name="departure"
                  placeholder="Arrival Date"
                  className="w-full p-2 bg-white"
                />
              </div>
              <div>
                <label>ADULT</label>
                <input
                  type="number"
                  name="adult"
                  min="1"
                  className="w-full p-2 bg-white"
                />
              </div>
              <div>
                <label>CHILD</label>
                <input
                  type="number"
                  name="child"
                  min="0"
                  className="w-full p-2 bg-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#8E7037] text-white font-bold py-2 transition duration-300 ease-in-out hover:bg-white hover:text-[#8E7037]"
              >
                BOOK NOW
              </button>
            </form>
          </div>
        </div>

        {/* Room Tabs Section */}
        <div className="p-6 max-w-6xl mx-auto">
          <Tabs roomData={roomData} />
        </div>
      </div>
    </div>
  );
}

// 👇 Tab Component (outside RoomDetails)
function Tabs({ roomData }) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { key: "overview", label: "OVERVIEW", content: roomData.descOverview },
    { key: "amenities", label: "AMENITIES", content: roomData.amenities },
    { key: "packages", label: "PACKAGES", content: roomData.packages.join(", ") },
    { key: "rates", label: "RATES", content: roomData.rate },
    { key: "calendar", label: "CALENDAR", content: roomData.calendar },
  ];

  return (
    <>
      {/* Mobile View */}
      <div className="block md:hidden ">
        <div className="flex flex-col items-center space-y-2 mb-6">

          {tabs.map((tab) => (
            <div key={tab.key}>
              <button
                onClick={() => setActiveTab(tab.key)}
                className={`text-lg font-bold block border-b-2 pb-2 w-full text-left ${activeTab === tab.key
                  ? "border-[#8E7037] text-[#8E7037]"
                  : "border-gray-300"
                  }`}
              >
                {tab.label}
              </button>
              {activeTab === tab.key && (
                <p className="text-gray-600 mt-2">{tab.content}</p>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-5 gap-6 mt-10">
        <div className="col-span-1 space-y-4 text-sm font-semibold">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`block w-full text-left border-b-2 pb-2 ${activeTab === tab.key
                ? "border-[#8E7037] text-[#8E7037]"
                : "border-gray-300"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="col-span-4">
          <h3 className="text-xl font-bold mb-2">
            {tabs.find((t) => t.key === activeTab).label}
          </h3>
          <p className="text-gray-600">
            {tabs.find((t) => t.key === activeTab).content}
          </p>
        </div>
      </div>
    </>
  );
}





//BACKEND DB SHOULD BE UPDATE
/* 
{
  "Living Room": [
    "Oversized work desk",
    "Hairdryer",
    "Iron/ironing board upon request"
  ],
  "Bedroom": [
    "Coffee maker",
    "25 inch or larger TV",
    "Cable/satellite TV channels",
    "AM/FM clock radio",
    "Voicemail"
  ],
  "Kitchen Room": [
    "AM/FM clock radio",
    "Voicemail",
    "High-speed Internet access"
  ],
  "Bathroom": [
    "Dataport",
    "Phone access fees waived",
    "24-hour Concierge service",
    "Private concierge"
  ],
  "Balcony": [
    "AM/FM clock radio",
    "Voicemail",
    "High-speed Internet access"
  ],
  "Oversized Work Desk": [
    "Dataport",
    "Phone access fees waived",
    "24-hour Concierge service",
    "Private concierge"
  ]
}





*/






