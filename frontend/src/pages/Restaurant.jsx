import { useState } from "react";
import { restaurantData } from "../assets/restaurantData.js";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaTripadvisor,
  FaCalendarAlt,
} from "react-icons/fa";

export default function Restaurant() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeMeal, setActiveMeal] = useState("Breakfast");

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  const filteredItems =
    restaurantData.find((group) => group.title === activeMeal)?.items || [];

  const filteredDrinks =
    restaurantData.find((group) => group.title === activeMeal)?.drinks || [];

  return (
    <>
      {/* Hero Banner */}
      <section
        className="absolute top-0 left-0 w-full h-[30vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/chef-is-carefully-plating-dish-restaurant-kitchen-plate-is-arranged-with-variety-colorful-vegetables-small-portion-meat_36682-6799.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="relative text-white text-center px-4">
          <h1 className="text-6xl md:text-7xl font-bold uppercase font-['Playfair_Display']">
            Culinary Elegance
          </h1>
          <p className="text-xl md:text-2xl mt-2 font-['Playfair_Display']">
            Welcome to{" "}
            <span className="font-semibold">Restaurant Royal Grand</span>
          </p>
          <p className="text-lg mt-4 italic">
            Indulge in an Exquisite Culinary Journey
          </p>
        </div>
      </section>

     {/* Meal Selection */}
<div className="flex justify-center space-x-100 mt-[50vh] mb-20">
  {["Breakfast", "Lunch", "Dinner"].map((meal) => (
    <button
      key={meal}
      className={`text-lg font-semibold focus:outline-none cursor-pointer ${
        activeMeal === meal ? "text-[#8E7037]" : "text-gray-500"
      }`}
      onClick={() => setActiveMeal(meal)}
    >
      {meal}
    </button>
  ))}
</div>


      {/* Menu Section */}
      <div className="flex flex-col items-center justify-center relative px-4">
        <div className="w-full max-w-screen-lg space-y-12">
          <h2 className="text-3xl font-semibold font-['Playfair_Display'] text-center mb-8">
            {activeMeal}
          </h2>

          {/* Display items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => openModal(item)}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-[100px] h-[100px] object-cover"
                />
                <div className="text-left">
                  <h4 className="text-lg font-semibold font-['Playfair_Display']">
                    {item.name}
                  </h4>
                  <p className="font-bold text-[#8E7037]">{item.price}</p>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Drinks Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold font-['Playfair_Display'] mb-6">
              Drinks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {filteredDrinks.map((drink, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => openModal(drink)}
                >
                  <img
                    src={drink.img}
                    alt={drink.name}
                    className="w-[100px] h-[100px] object-cover"
                  />
                  <div className="text-left">
                    <h4 className="text-lg font-semibold font-['Playfair_Display']">
                      {drink.name}
                    </h4>
                    <p className="font-bold text-[#8E7037]">{drink.price}</p>
                    <p className="text-gray-600 text-sm">{drink.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Section */}
      <div className="bg-black/80 backdrop-blur-md py-12">
        <div className="max-w-screen-md mx-auto px-4">
          <h2 className="text-3xl font-semibold font-['Playfair_Display'] text-center text-white mb-8">
            Reservation
          </h2>

          <form className="bg-white p-6 rounded shadow space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border border-[#8E7037] p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#8E7037]"
              />
              <input
                type="email"
                placeholder="Email"
                className="border border-[#8E7037] p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#8E7037]"
              />
              <input
                type="text"
                placeholder="Phone"
                className="border border-[#8E7037] p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#8E7037]"
              />
              <input
                type="date"
                className="border border-[#8E7037] p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#8E7037]"
              />
            </div>
            <textarea
              placeholder="Message"
              className="border border-[#8E7037] p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#8E7037]"
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="bg-[#8E7037] text-white py-2 px-4 rounded hover:bg-[#7a5e2f] transition"
            >
              Book Table
            </button>
          </form>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="my-10">
        <h2 className="text-3xl font-semibold text-center font-['Playfair_Display'] mb-6">
          Gallery Restaurant
        </h2>
        <div className="flex justify-center space-x-4 mb-6">
          {["All", "Breakfast", "Lunch", "Dinner", "Drinks"].map((tab) => (
            <button
              key={tab}
              className="bg-[#8E7037] text-white px-4 py-2 rounded"
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
          {restaurantData.flatMap((group) =>
            group.items.concat(group.drinks).map((item) => (
              <div
                key={item.name}
                className="relative cursor-pointer"
                onClick={() => openModal(item)}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-[200px] object-cover"
                />
              </div>
            ))
          )}
        </div>
      </section>

      {/* Modal for Enlarged Image */}
      {modalOpen && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-xl text-gray-600"
            >
              &times;
            </button>
            <img
              src={selectedItem.img}
              alt={selectedItem.name}
              className="w-[400px] h-[400px] object-cover mb-4"
            />
            <h4 className="text-lg font-semibold mb-2">{selectedItem.name}</h4>
            <p className="text-gray-600">{selectedItem.desc}</p>
          </div>
        </div>
      )}
    </>
  );
}