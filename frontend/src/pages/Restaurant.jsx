import { useState } from "react";
import { restaurantData } from "../assets/restaurantData.js";
import emailjs from "emailjs-com"; // Import EmailJS SDK
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const errors = {};
    if (!form.name.value) errors.name = "Name is required.";
    if (!form.email.value) errors.email = "Email is required.";
    if (!form.phone.value) errors.phone = "Phone number is required.";
    if (!form.date.value) errors.date = "Date is required.";
    if (!form.guests.value) errors.guests = "Number of guests is required.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return; // If there are errors, this stops the form submission
    }
    // Prepare email parameters
    const templateParams = {
      name: form.name.value,
      email: form.email.value,
      phone: `${form.countryCode.value}${form.phone.value}`,
      date: form.date.value,
      guests: form.guests.value,
      message: form.message.value,
    };

    // Send email using EmailJS
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
          setFormErrors({}); // Clear any previous errors
          form.reset(); // Reset form fields immediately

          // Reset confirmation message after 4 seconds
          setTimeout(() => {
            setIsSubmitted(false);
          }, 4000);
        },
        (error) => {
          console.log("Failed to send email. Error: ", error);
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

          {/* Display items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {filteredItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-[100px] h-[100px] object-cover"
                />
                <div className="text-left">
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <p className="font-bold text-[#8E7037]">{item.price}</p>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Drinks Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6">Drinks</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {filteredDrinks.map((drink, index) => (
                <div key={index} className="flex items-center gap-4">
                  <img
                    src={drink.img}
                    alt={drink.name}
                    className="w-[100px] h-[100px] object-cover"
                  />
                  <div className="text-left">
                    <h4 className="text-lg font-semibold">{drink.name}</h4>
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
      <div className="bg-black/80 backdrop-blur-md mt-10 py-12">
        <div className="max-w-screen-md mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-white mb-8">
            Reservation
          </h2>

          {isSubmitted ? (
            <div className="bg-green-200 text-black-800 p-4 rounded text-center">
              Thank you for choosing Royal Grand Dining! We appreciate your
              reservation request and will contact you shortly with a
              confirmation email.
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
                    className="border border-[#8E7037] p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#8E7037]"
                  />
                  {formErrors.name && (
                    <span className="text-red-500 text-sm absolute bottom-0 left-0">
                      {formErrors.name}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border border-[#8E7037] p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#8E7037]"
                  />
                  {formErrors.email && (
                    <span className="text-red-500 text-sm absolute bottom-0 left-0">
                      {formErrors.email}
                    </span>
                  )}
                </div>
                <div className="flex space-x-2 relative">
                  {/* Country Code Dropdown */}
                  <select
                    name="countryCode"
                    className="border border-[#8E7037] p-2 rounded w-1/3 focus:outline-none focus:ring-2 focus:ring-[#8E7037]"
                    defaultValue="+1"
                  >
                    {[
                      { code: "+1", name: "USA" },
                      { code: "+252", name: "Somalia" },
                      { code: "+98", name: "Iran" },
                      { code: "+92", name: "Pakistan" },
                      { code: "+93", name: "Afghanistan" },
                    ]
                      .sort((a, b) => a.name.localeCompare(b.name)) // Alphabetical order by country name
                      .map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.code}
                        </option>
                      ))}
                  </select>
                  {/* Phone Number Input */}
                  <input
                    name="phone"
                    type="text"
                    placeholder="Phone"
                    className="border border-[#8E7037] p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#8E7037]"
                  />
                  {formErrors.phone && (
                    <span className="text-red-500 text-sm absolute bottom-0 left-0">
                      {formErrors.phone}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    name="date"
                    type="date"
                    className="border border-[#8E7037] p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#8E7037]"
                  />
                  {formErrors.date && (
                    <span className="text-red-500 text-sm relative bottom-0 left-0">
                      {formErrors.date}
                    </span>
                  )}
                </div>

                <select
                  name="guests"
                  className="border border-[#8E7037] p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#8E7037]"
                >
                  <option value="">Number of Guests</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                {formErrors.guests && (
                  <span className="text-red-500 text-sm absolute bottom-0 left-0">
                    {formErrors.guests}
                  </span>
                )}
              </div>
              <textarea
                name="message"
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
          )}
        </div>
      </div>

      {/* Gallery Section */}
      <section className="my-10">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Select a photo to view it in detail.
        </h2>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl relative max-w-md w-full">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-800"
              aria-label="Close modal"
            >
              &times;
            </button>
            <img
              src={selectedItem.img}
              alt={selectedItem.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h4 className="text-xl font-semibold mb-2">{selectedItem.name}</h4>
            <p className="text-gray-600">{selectedItem.desc}</p>
          </div>
        </div>
      )}
    </>
  );
}
