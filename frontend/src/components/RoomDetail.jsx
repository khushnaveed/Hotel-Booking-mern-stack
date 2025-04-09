/* import React, { useEffect, useState } from 'react';
import hotelRoomsData from '../assets/hotelRoomsData';
import { useLocation, useParams } from 'react-router-dom';

export default function RoomDetails() {
  const [roomData, setRoomData] = useState();
  const location = useLocation();

  const { roomSlug } = useParams();

  useEffect(() => {
    const result = hotelRoomsData.filter(value => roomSlug === value.slug)[0];
    setRoomData(result);
  }, [roomSlug]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % roomData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? roomData.images.length - 1 : prev - 1
    );
  };

  return (
    <>
      {!roomData ? <div>Loading...</div> : (
        <div className="relative">
          <section
            className="absolute top-0 left-0 w-full h-[40vh] bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/src/assets/aboutHero.jpg')" }}
          >
            <div className="absolute inset-0 bg-black opacity-30"></div>
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
              <div>
                <div className="relative">
                  <img
                    src={roomData?.images[currentImageIndex]}
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
                        ? "border-yellow-500"
                        : "border-gray-300"
                        }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-gray-100 p-6 shadow-lg h-fit">
                <h5 className="text-xl font-semibold mb-4">
                  STARTING ROOM FROM{" "}
                  <strong className="text-[#8E7037]">${roomData.price}/day</strong>
                </h5>
                <form className="space-y-4">
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
                    className="w-full bg-[#8E7037] text-white font-bold py-2 transition duration-300 ease-in-out hover:bg-white hover:text-[#8E7037] "
                  >
                    BOOK NOW
                  </button>
                </form>
              </div>
            </div>

            <div className="p-6 max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold mb-2">Room Overview</h3>
              <p className="text-gray-600">{roomData.descOverview}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
} */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function RoomDetails() {
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { roomSlug } = useParams();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:5005/room/${roomSlug}`);
        console.log("room data", res.data)
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
                    ? "border-yellow-500"
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
            <form className="space-y-4">
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

        {/* Room Description */}
        <div className="p-6 max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-2">Room Overview</h3>
          <p className="text-gray-600">{roomData.descOverview}</p>

        </div>
      </div>
    </div>
  );
}


//I WILL WORK ON IT ON WEDNESDAY
/*

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const tabs = ["Overview", "Amenities", "Package", "Rates", "Calendar"];

const RoomDetail = () => {
  const { roomType } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/room/${roomType}`);
        setRoomData(response.data);
      } catch (error) {
        console.error("Error fetching room:", error);
      }
    };
    fetchRoom();
  }, [roomType]);

  if (!roomData) return <div>Loading...</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return <p className="mt-4 text-gray-700">{roomData.description}</p>;

      case "Amenities":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700 mt-4">
            {Object.entries(roomData.amenities || {}).map(([section, items]) => (
              <div key={section}>
                <h4 className="font-semibold uppercase mb-1">{section}</h4>
                <ul className="list-disc list-inside">
                  {items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case "Package":
        return <p className="mt-4 text-gray-700">Package details coming soon.</p>;

      case "Rates":
        return <p className="mt-4 text-gray-700">Rates and pricing information coming soon.</p>;

      case "Calendar":
        return <p className="mt-4 text-gray-700">Calendar and availability coming soon.</p>;

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{roomData.title}</h1>


<div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
  {roomData.images?.map((img, idx) => (
    <img key={idx} src={img} alt={`Room ${idx}`} className="rounded shadow" />
  ))}
</div>


<div className="flex space-x-6 border-b border-gray-200 text-sm font-medium">
  {tabs.map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`pb-2 ${activeTab === tab ? "border-b-2 border-yellow-500 text-yellow-600" : "text-gray-500"
        }`}
    >
      {tab}
    </button>
  ))}
</div>


<div className="mt-6">{renderTabContent()}</div>
    </div >
  );
};

export default RoomDetail;


*/


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






