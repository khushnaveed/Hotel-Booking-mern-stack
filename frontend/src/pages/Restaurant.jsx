/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
"use client";

import { useState, useEffect, useCallback } from "react";
import emailjs from "emailjs-com";

export default function Restaurant() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeMeal, setActiveMeal] = useState("Breakfast");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [allFoodItems, setAllFoodItems] = useState([]); // New state for all food items
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  const fetchMenuItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5005/foods");
      if (!response.ok) {
        throw new Error(`Fetch error: ${response.status}`);
      }
      const data = await response.json();

      const items = Array.isArray(data)
        ? data
        : data.data || data.restaurantData || [];
      if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Invalid or empty data");
      }

      // Generate 40 items regardless of API response
      const generatedItems = Array.from({ length: 40 }, (_, i) => {
        // Use real data for the first items if available
        if (i < items.length) {
          return items[i];
        }
        // Generate sample data for the rest
        return {
          id: i + 1,
          name: `Food Item ${i + 1}`,
          price: ((i % 10) + 5).toFixed(2),
          desc: `Delicious food item ${i + 1}`,
          title:
            i % 4 === 0
              ? "Breakfast"
              : i % 4 === 1
              ? "Lunch"
              : i % 4 === 2
              ? "Dinner"
              : "Drink",
          img: null, // No image, will use placeholder
        };
      });

      // Store all 40 food items
      setAllFoodItems(generatedItems);

      // Filter items for the active meal
      const filteredMenuItems = items.filter(
        (item) => item.title?.toLowerCase() === activeMeal.toLowerCase()
      );
      console.log("Fetched items:", items);
      const filteredDrinks = items.filter(
        (item) => item.title?.toLowerCase() === "drink"
      );

      setMenuItems(filteredMenuItems);
      setDrinks(filteredDrinks);
    } catch (err) {
      console.error("Failed to fetch menu items:", err);
      setError(`Unable to load menu. Error: ${err.message}`);
      setError("Unable to load menu. Please try again later.");

      // Create sample data if API fails - ensure we have 40 items
      const sampleData = Array.from({ length: 40 }, (_, i) => ({
        id: i + 1,
        name: `Sample Food Item ${i + 1}`,
        price: ((i % 10) + 5).toFixed(2),
        desc: `Delicious sample food item ${i + 1}`,
        title:
          i % 4 === 0
            ? "Breakfast"
            : i % 4 === 1
            ? "Lunch"
            : i % 4 === 2
            ? "Dinner"
            : "Drink",
      }));

      setAllFoodItems(sampleData);
      setMenuItems(sampleData.filter((item) => item.title === activeMeal));
      setDrinks(sampleData.filter((item) => item.title === "Drink"));
    } finally {
      setLoading(false);
    }
  }, [activeMeal]);

  useEffect(() => {
    fetchMenuItems();
  }, [activeMeal, fetchMenuItems]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const errors = {};
    if (!form.name.value) errors.name = "Name is required.";
    if (!form.email.value) errors.email = "Email is required.";
    if (!form.phone.value) errors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(form.phone.value))
      errors.phone = "Please enter a valid 10-digit phone number.";
    if (!form.date.value) errors.date = "Date is required.";
    if (!form.guests.value) errors.guests = "Number of guests is required.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const templateParams = {
      name: form.name.value,
      email: form.email.value,
      phone: `${form.countryCode.value}${form.phone.value}`,
      date: form.date.value,
      guests: form.guests.value,
      message: form.message.value,
    };

    emailjs
      .send(
        "service_grgwfqx",
        "template_4dimzkl",
        templateParams,
        "Q0RGdIfcq2A_dJRBm"
      )
      .then(
        (response) => {
          console.log(
            "Email sent successfully!",
            response.status,
            response.text
          );
          setIsSubmitted(true);
          setFormErrors({});
          form.reset();
          setTimeout(() => setIsSubmitted(false), 4000);
        },
        (error) => {
          console.log("Email failed:", error);
        }
      );
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative w-full h-[80vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(https://img.freepik.com/premium-photo/chef-is-carefully-plating-dish-restaurant-kitchen-plate-is-arranged-with-variety-colorful-vegetables-small-portion-meat_36682-6799.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="relative text-white text-center z-10">
          <h1
            className="text-5xl font-bold uppercase"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            Culinary Elegance
          </h1>
          <p
            className="text-lg mt-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            Indulge in an Exquisite Culinary Journey
          </p>
        </div>
      </section>

      {/* Meal Selection */}
      <div className="flex justify-center space-x-10 mt-10 mb-20">
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
          <h2 className="text-3xl font-semibold text-center mb-8">
            {activeMeal}
          </h2>

          {/* Loading and Error States */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#8E7037] border-r-transparent"></div>
              <p className="mt-2">Loading menu items...</p>
            </div>
          )}

          {error && !loading && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
              <p className="mt-2">Using sample menu data instead.</p>
            </div>
          )}

          {/* Display items */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {menuItems.length > 0 ? (
                menuItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img
                      src={item.img || "/placeholder.svg?height=100&width=100"}
                      alt={item.name}
                      className="w-[100px] h-[100px] object-cover rounded-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.svg?height=100&width=100";
                      }}
                    />
                    <div className="text-left">
                      <h4 className="text-lg font-semibold">{item.name}</h4>
                      <p className="font-bold text-[#8E7037]">${item.price}</p>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8">
                  <p>
                    No {activeMeal.toLowerCase()} items available at this time.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Drinks Section */}
          {!loading && (
            <div className="mt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {drinks.length > 0 ? (
                  drinks.map((drink, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <img
                        src={
                          drink.img || "/placeholder.svg?height=100&width=100"
                        }
                        alt={drink.name}
                        className="w-[100px] h-[100px] object-cover rounded-md"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "/placeholder.svg?height=100&width=100";
                        }}
                      />
                      <div className="text-left">
                        <h4 className="text-lg font-semibold">{drink.name}</h4>
                        <p className="font-bold text-[#8E7037]">
                          ${drink.price}
                        </p>
                        <p className="text-gray-600 text-sm">{drink.desc}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8"></div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reservation Section */}
      <div className="bg-black/80 backdrop-blur-md mt-10 py-12">
        <div className="max-w-screen-md mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-white mb-8">
            Reservation
          </h2>

          {isSubmitted ? (
            <div className="bg-green-200 text-black-800 p-4 rounded text-center">
              Thank you for selecting Royal Grand Dining! Our team will be in touch shortly.
            </div>
          ) : (
            <form
              className="bg-white p-6 rounded shadow space-y-4"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="border border-[#8E7037] p-2 rounded w-full"
                  />
                  {formErrors.name && (
                    <span className="text-red-500 text-sm">
                      {formErrors.name}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border border-[#8E7037] p-2 rounded w-full"
                  />
                  {formErrors.email && (
                    <span className="text-red-500 text-sm">
                      {formErrors.email}
                    </span>
                  )}
                </div>
                <div className="flex space-x-2 relative">
                  <select
                    name="countryCode"
                    className="border border-[#8E7037] p-2 rounded w-1/3"
                    defaultValue="+1"
                  >
                    {[
                      { code: "+1", name: "USA" },
                      { code: "+252", name: "Somalia" },
                      { code: "+98", name: "Iran" },
                      { code: "+92", name: "Pakistan" },
                      { code: "+93", name: "Afghanistan" },
                    ]
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.code}
                        </option>
                      ))}
                  </select>
                  <input
                    name="phone"
                    type="text"
                    placeholder="Phone"
                    className="border border-[#8E7037] p-2 rounded w-full"
                  />
                </div>
                {formErrors.phone && (
                  <span className="text-red-500 text-sm">
                    {formErrors.phone}
                  </span>
                )}
                <div className="relative">
                  <input
                    name="date"
                    type="date"
                    className="border border-[#8E7037] p-2 rounded w-full"
                  />
                  {formErrors.date && (
                    <span className="text-red-500 text-sm">
                      {formErrors.date}
                    </span>
                  )}
                </div>

                <select
                  name="guests"
                  className="border border-[#8E7037] p-2 rounded w-full"
                >
                  <option value="">Number of Guests</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                {formErrors.guests && (
                  <span className="text-red-500 text-sm">
                    {formErrors.guests}
                  </span>
                )}
              </div>
              <textarea
                name="message"
                placeholder="Message"
                className="border border-[#8E7037] p-2 rounded w-full"
                rows="4"
              ></textarea>
              <button
                type="submit"
                className="bg-[#8E7037] text-white py-2 px-4 rounded hover:bg-[#a28344]"
              >
                Book Table
              </button>
            </form>
          )}
        </div>
      </div>
      {/* Gallery Section */}
      <section className="py-16 bg-white px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">
        Choose from the Gallery
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Explore our collection of 40 culinary creations
        </p>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#8E7037] border-r-transparent"></div>
            <p className="mt-2">Loading gallery...</p>
          </div>
        ) : (
          <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {/* Use allFoodItems directly, or generate 40 items if it's empty */}
            {(allFoodItems.length >= 40
              ? allFoodItems
              : Array.from({ length: 40 }, (_, i) => ({
                  id: i + 1,
                  name: `Food Item ${i + 1}`,
                  price: ((i % 10) + 5).toFixed(2),
                  desc: `Delicious food item ${i + 1}`,
                  title:
                    i % 4 === 0
                      ? "Breakfast"
                      : i % 4 === 1
                      ? "Lunch"
                      : i % 4 === 2
                      ? "Dinner"
                      : "Drink",
                }))
            ).map((item, index) => (
              <div
                key={index}
                className="cursor-pointer group relative overflow-hidden rounded-xl shadow-lg"
                onClick={() => openModal(item)}
              >
                <img
                  src={
                    item.img ||
                    `/placeholder.svg?height=160&width=120&text=${encodeURIComponent(
                      item.name || `Item ${index + 1}`
                    )}`
                  }
                  alt={item.name}
                  className="w-full h-40 object-cover transform group-hover:scale-105 transition duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `/placeholder.svg?height=160&width=120&text=${encodeURIComponent(
                      item.name || `Item ${index + 1}`
                    )}`;
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 text-center truncate">
                  {item.name}
                </div>
                <div className="absolute top-0 right-0 bg-[#8E7037] text-white text-[10px] px-1 py-0.5 rounded-bl-md">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image Modal */}
        {modalOpen && selectedItem && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-lg p-4 max-w-2xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-gray-700 hover:text-black text-xl"
                onClick={closeModal}
              >
                &times;
              </button>
              <img
                src={
                  selectedItem.img ||
                  `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(
                    selectedItem.name || "Food Item"
                  )}`
                }
                alt={selectedItem.name}
                className="w-full h-auto rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(
                    selectedItem.name || "Food Item"
                  )}`;
                }}
              />
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xl font-semibold">{selectedItem.name}</h4>
                <span className="inline-block bg-[#8E7037] text-white text-xs px-2 py-1 rounded mt-1 mb-2">
                  {selectedItem.title}
                </span>
                <p className="text-gray-600">{selectedItem.desc}</p>
                {selectedItem.price && (
                  <p className="mt-2 font-bold text-[#8E7037]">
                    ${selectedItem.price}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
