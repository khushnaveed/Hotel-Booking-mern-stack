import React, { useEffect, useState } from 'react';
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
          {/* Hero Section placed outside the main div */}
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

          <div className="pt-[40vh] md:pt-[40vh]"> {/* The padding ensures the content is below the hero */}
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
}








//FIRST CODE
/* import React, { useEffect, useState } from 'react';
import hotelRoomsData from '../assets/hotelRoomsData'; // Correct path to your JSON file
import { useLocation, useParams } from 'react-router-dom';
//npm install react-datepicker
//import DatePicker from "react-datepicker"


export default function RoomDetails() {
  //const roomData = hotelRoomsData[0]; // Access the first room's data, or map through the rooms for multiple
  const [roomData, setRoomData] = useState()
  const location = useLocation()
  useEffect(() => {
    // console.log(location)



  }, [location])

  const { roomSlug } = useParams();

  useEffect(() => {
    console.log(roomSlug)
    const result = hotelRoomsData.filter(value => roomSlug === value.slug)[0];
    console.log(result)
    setRoomData(result)

  }, [roomSlug])




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
      {!roomData ? <div>Loading...</div> :

        <div>

          <section
            className="relative w-full h-[25vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center"
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

          <div className="pt-4 md:pt-[30vh]"> 
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
                      alt={thumb - ${index}}
                  className={w - 20 h-16 object-cover cursor-pointer border ${index === currentImageIndex
                    ? "border-yellow-500"
                    : "border-gray-300"
                  }}
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




      }


    </>
  );
}  */