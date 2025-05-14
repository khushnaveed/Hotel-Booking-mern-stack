import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoomCard({
  room,
  index,
  currency,
  currencySymbols,
  expandedRoom,
  onToggle,
}) {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden group sm:w-[80%] m-5">
      <img
        src={room.images?.[0] || "/fallback-image.jpg"}
        alt={room.title}
        className="transition-all duration-300 transform group-hover:scale-120 object-cover w-full h-130 group-hover:filter group-hover:brightness-75"
      />
      <div
        className={`absolute top-0 ${index % 2 === 0 ? "left-0" : "right-0"} 
                     h-full w-[90%] sm:w-[60%] md:w-[40%] 
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

        <p className={`mt-4 ${expandedRoom === room._id ? "text-[12px]" : ""}`}>
          {expandedRoom === room._id
            ? room.descOverview
            : `${room.descOverview.slice(0, 200)}...`}
        </p>

        <button
          onClick={() => onToggle(room._id)}
          className="text-blue-500 text-sm mt-2"
        >
          {expandedRoom === room._id ? "Read Less" : "Read More"}
        </button>

        <ul className="hidden lg:block list-disc pl-5 mt-4 text-sm sm:text-base md:text-lg">
          <li>Max: 4 Person(s)</li>
          <li>Size: 35 m2 / 376 ft2</li>
          <li>View: Ocean</li>
          <li>Bed: King-size or twin beds</li>
        </ul>

        <button
          onClick={() => navigate(`/rooms/${room.slug}`)}
          className="px-4 sm:px-6 py-2 sm:pb-2 pb-4 text-sm sm:text-base 
            bg-[#8E7037]  text-white 
            hover:bg-white hover:text-[#8E7037] 
            border-2 border-[#8E7037] w-max mt-4 ml-2 sm:ml-6"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
