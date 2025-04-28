import React from "react";
import { Link } from "react-router-dom";

export default function AnotherAccommodation({ relatedRooms }) {
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">ANOTHER ACCOMMODATION</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                {relatedRooms.map((room) => (
                    <Link to={`/rooms/${room.slug}`} key={room.slug}>
                        <div className="flex flex-col gap-4 p-4 shadow hover:shadow-md hover:scale-105 transition">
                            <img
                                src={room.images[0]}
                                alt={room.title}
                                className="w-full h-40 object-cover rounded"
                            />
                            <ul className="text-gray-600 text-sm">
                                <li className="font-semibold text-center">{room.title}</li>
                                <li><strong>Max:</strong> {room.additionalDetails.maxPersons} Person(s)</li>
                                <li><strong>Bed:</strong> {room.additionalDetails.bed}</li>
                                <li><strong>View:</strong> {room.additionalDetails.view}</li>
                            </ul>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
