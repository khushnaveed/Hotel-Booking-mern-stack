import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCurrency } from "../context/CurrencyContext.jsx";
//import RoomAvailabilityCalendar from "./RoomAvailabilityCalenar.jsx";
//import AnotherAccommodation from "./AnotherAccommodation.jsx";
import RoomGallery from "./roomDetailComponents/RoomGallery.jsx";
import RoomTabs from "./roomDetailComponents/RoomTabs.jsx";
import BookingForm from "./roomDetailComponents/BookingForm.jsx";
import { useCart } from "../context/CartContext";
import { useRoomDetail } from "../context/RoomDetailContext.jsx";
export default function RoomDetails() {
  //testing context
  //const [roomData, setRoomData] = useState(null);
  const { roomData, setRoomData, bookingData, setBookingData } = useRoomDetail();
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { currency } = useCurrency();
  const currencySymbols = { USD: "$", EUR: "€", GBP: "£" };
  const calendarRef = useRef(null)
  const { addToCart } = useCart();
  //testing context
  /*  const [bookingData, setBookingData] = useState({
     arrive: "",
     departure: "",
     adult: 1,
     child: 0,
   }); */

  const { roomSlug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:5005/room/${roomSlug}`);
        setRoomData(res.data.data);
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [roomSlug]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % roomData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? roomData.images.length - 1 : prev - 1
    );
  };

  const handleBookingClick = () => {
    const { arrive, departure, adult, child } = bookingData;

    if (!arrive || !departure) {
      alert("Please select both arrival and departure dates.");
      return;
    }

    const start = new Date(arrive);
    const end = new Date(departure);

    if (end <= start) {
      alert("Departure date must be after arrival date.");
      return;
    }

    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const basePrice = roomData.defaultPrice;
    const extraAdultFee = 70;
    const childFee = 30;
    const numAdults = parseInt(adult) || 1;
    const numChildren = parseInt(child) || 0;

    let totalPrice = basePrice * nights;
    if (numAdults > 2) {
      totalPrice += (numAdults - 2) * extraAdultFee * nights;
    }
    totalPrice += numChildren * childFee * nights;

    const payload = {
      slug: roomSlug,
      arrivalDate: arrive,
      departureDate: departure,
      numAdults,
      numChildren,
      selectedPackages: [],
      totalPrice,
      nights,
      image: roomData.images[0],
    };
    addToCart(payload);
    navigate("/login");
  };
  if (loading) return <div>Loading...</div>;
  if (!roomData) return <div>Room information not found.</div>;

  return (
    <div className="relative">
      {/* Hero Section */}
      <section
        className="absolute top-0 left-0 w-full h-[40vh] bg-cover bg-center flex items-center justify-center pt-20 sm:pt-24 md:pt-28 lg:pt-32"
        style={{ backgroundImage: "url('/src/assets/aboutHero.jpg')" }}
      >
        <div className="absolute inset-0 bg-opacity-40"></div>
        <div className="relative text-white text-center px-4 sm:px-6 md:px-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase">
            {roomData.title}
          </h1>
          <p
            className="text-lg mt-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            Royal Grand Hotel is where timeless elegance meets modern luxury in every detail.
          </p>
        </div>
      </section>

      <div className="pt-[60vh] sm:pt-[65vh] md:pt-[70vh] lg:pt-[60vh] xl:pt-[50vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-6xl mx-auto">
          {/* Room Gallery */}
          <RoomGallery
            images={roomData.images}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
          {/* Booking Form */}
          <BookingForm
            bookingData={bookingData}
            setBookingData={setBookingData}
            roomData={roomData}
            handleBookingClick={handleBookingClick}
            currency={currency}
            currencySymbols={currencySymbols}
          />
        </div>
        {/* Room Tabs Section */}
        <div className="p-6 max-w-6xl mx-auto">
          <RoomTabs roomData={roomData} calendarRef={calendarRef} />
        </div>
      </div>
    </div>
  );
}

// Tabs Component

/* function Tabs({ roomData, calendarRef }) {
  const [relatedRooms, setRelatedRooms] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const { roomSlug } = useParams();


  useEffect(() => {
    const fetchRelatedRooms = async () => {
      try {
        const res = await axios.get(`http://localhost:5005/room`);
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
  // Scroll to Calendar when the "Check Availability" button is clicked
  const handleCheckAvailabilityClick = () => {
    calendarRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const tabs = [
    {
      key: "overview",
      label: "OVERVIEW",
      content: (
        <>
          <p>{roomData.descOverview}</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-5 mt-4 text-gray-600">
            <li>
              <strong>SPECIAL ROOM</strong>
            </li>
            <li>
              <strong>Max:</strong> {roomData.additionalDetails.maxPersons}{" "}
              Person(s)
            </li>
            <li>
              <strong>Size:</strong> {roomData.additionalDetails.size}
            </li>
            <li>
              <strong>View:</strong> {roomData.additionalDetails.view}
            </li>
            <li>
              <strong>Bed:</strong> {roomData.additionalDetails.bed}
            </li>
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
            {Object.entries(roomData.amenities).map(
              ([roomType, items], idx) => (
                <div key={idx} className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-700">
                    {roomType}
                  </h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    {items.map((amenity, i) => (
                      <li key={i}>{amenity}</li>
                    ))}
                  </ul>
                </div>
              )
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
                new Date(rating.startDate).getTime() <=
                new Date(price.endDate).getTime() &&
                new Date(rating.endDate).getTime() >=
                new Date(price.startDate).getTime()
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
                    <p>
                      <strong>Rating:</strong> {matchingRating.rating} / 5
                    </p>
                    <p>
                      <strong>Description:</strong> {matchingRating.description}
                    </p>
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
          </div >


          <RoomAvailabilityCalendar slug={roomData.slug} />
        </div>
      ),
    },

  ];

  return (
    <>
      <div className="block md:hidden">
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
                <div className="text-gray-600 mt-2">{tab.content}</div>
              )}
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
          <div className="text-gray-600">
            {tabs.find((t) => t.key === activeTab).content}
          </div>
        </div>
      </div>

      <div>
        <div className="border-t-2 border-gray-300 my-10"></div>

        <AnotherAccommodation relatedRooms={relatedRooms} />

      </div>
    </>
  );
} */
