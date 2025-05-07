import React from "react";
import RoomCard from "./RoomCard.jsx";

export default function RoomList({ rooms, currency, currencySymbols, expandedRoom, onToggle }) {
  return (
    <>
      {rooms.map((room, index) => (
        <RoomCard
          key={room._id}
          room={room}
          index={index} 
          currency={currency}
          currencySymbols={currencySymbols}
          expandedRoom={expandedRoom}
          onToggle={onToggle}
        />
      ))}
    </>
  );
}
