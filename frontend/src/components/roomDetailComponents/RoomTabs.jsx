import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import RoomAvailabilityCalendar from "./RoomAvailabilityCalenar.jsx";
import AnotherAccommodation from "./AnotherAccommodation.jsx";

export default function RoomTabs({ roomData, calendarRef }) {
    const [relatedRooms, setRelatedRooms] = useState([]);
    const [activeTab, setActiveTab] = useState("overview");
    const { roomSlug } = useParams();
    const baseUrl =
        import.meta.env.MODE === "development" ? "http://localhost:5005" : "";

    useEffect(() => {
        const fetchRelatedRooms = async () => {
            try {
                const res = await axios.get(baseUrl + `/room`);
                const filteredData = res.data.data.filter(
                    (value) => roomSlug !== value.slug
                );
                setRelatedRooms(filteredData);
            } catch (error) {
                console.error("Error fetching related rooms:", error);
            }
        };

        fetchRelatedRooms();
    }, [roomSlug]);

    const tabs = [
        {
            key: "overview",
            label: "OVERVIEW",
            content: (
                <>
                    <p className="text-justify">{roomData.descOverview}</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-5 mt-4 text-gray-600">
                        <li><strong>SPECIAL ROOM</strong></li>
                        <li><strong>Max:</strong> {roomData?.additionalDetails?.maxPersons} Person(s)</li>
                        <li><strong>Size:</strong> {roomData?.additionalDetails?.size}</li>
                        <li><strong>View:</strong> {roomData?.additionalDetails?.view}</li>
                        <li><strong>Bed:</strong> {roomData?.additionalDetails?.bed}</li>
                    </ul>
                </>
            ),
        },
        {
            key: "amenities",
            label: "AMENITIES",
            content: (
                <>
                    <p className="text-gray-600 mb-4">Located in the heart of Aspen...</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        {roomData.amenities && Object.entries(roomData.amenities).map(([roomType, items], idx) => (
                            <div key={idx} className="mb-6">
                                <h4 className="text-lg font-semibold text-gray-700">{roomType}</h4>
                                <ul className="list-disc pl-5 text-gray-600">
                                    {items.map((amenity, i) => <li key={i}>{amenity}</li>)}
                                </ul>
                            </div>
                        ))}
                        {!roomData.amenities && (
                            <p className="text-gray-500 italic">No amenities listed for this room.</p>
                        )}
                    </div>
                </>
            ),
        },
        {
            key: "packages",
            label: "PACKAGES",
            content: (
                <ul className="list-disc pl-5 text-gray-600">
                    {roomData.packages.map((pkg, i) => (
                        <li key={i}>{pkg}</li>
                    ))}
                </ul>
            ),
        },
        {
            key: "rates",
            label: "RATES",
            content:
                roomData.pricing && roomData.ratings ? (
                    roomData.pricing.map((price, index) => {
                        const matchingRating = roomData.ratings.find(
                            (rating) =>
                                new Date(rating.startDate).getTime() <= new Date(price.endDate).getTime() &&
                                new Date(rating.endDate).getTime() >= new Date(price.startDate).getTime()
                        );
                        return (
                            <div key={index} className="mb-4">
                                <p>
                                    <strong>Price:</strong> ${price.price}/day from{" "}
                                    {new Date(price.startDate).toLocaleDateString()} to{" "}
                                    {new Date(price.endDate).toLocaleDateString()}
                                </p>
                                {matchingRating && (
                                    <>
                                        <p><strong>Rating:</strong> {matchingRating.rating} / 5</p>
                                        <p><strong>Description:</strong> {matchingRating.description}</p>
                                    </>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p>No rates or ratings available.</p>
                ),
        },
        {
            key: "calendar",
            label: "CALENDAR",
            content: (
                <div ref={calendarRef} className="mt-4 space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-black border border-gray-400"></div>
                            <span className="text-gray-700 text-sm">Unavailable</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-white border border-gray-400"></div>
                            <span className="text-gray-700 text-sm">Available</span>
                        </div>
                    </div>
                    <RoomAvailabilityCalendar slug={roomData.slug} />
                </div>
            ),
        },
    ];

    return (
        <>

            <div className="block md:hidden">
                <div className="flex flex-col items-center space-y-4 mb-6">
                    {tabs.map((tab) => (
                        <div key={tab.key}>
                            <button
                                onClick={() => setActiveTab(tab.key)}
                                className={`text-lg font-bold block border-b-2 pb-2 w-full text-left ${activeTab === tab.key ? "border-[#8E7037] text-[#8E7037]" : "border-gray-300"
                                    }`}
                            >
                                {tab.label}
                            </button>
                            {activeTab === tab.key && <div className="text-gray-600 mt-2">{tab.content}</div>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="hidden md:grid md:grid-cols-5 gap-6 mt-10">
                <div className="col-span-1 space-y-4 text-sm font-semibold">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`block w-full text-left border-b-2 pb-2 ${activeTab === tab.key ? "border-[#8E7037] text-[#8E7037]" : "border-gray-300"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="col-span-4">
                    <h3 className="text-xl font-bold mb-2">{tabs.find((t) => t.key === activeTab).label}</h3>
                    <div className="text-gray-600">{tabs.find((t) => t.key === activeTab).content}</div>
                </div>
            </div>
            <div className="border-t-2 border-gray-300 my-10"></div>
            <AnotherAccommodation relatedRooms={relatedRooms} />
        </>
    );
}
