
import { useState, useEffect, useCallback } from "react";
import emailjs from "emailjs-com";
import { useCurrency } from "../context/CurrencyContext.jsx";
import HeroSection from "../components/HeroSection";
import MealSelector from "../components/restaurantComponents/MealSelector.jsx";
import MenuList from "../components/restaurantComponents/MenuList.jsx";
import ReservationForm from "../components/restaurantComponents/ReservationForm.jsx";
import RestaurantGallery from "../components/restaurantComponents/RestaurantGallery.jsx";

export default function Restaurant() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeMeal, setActiveMeal] = useState("Breakfast");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [allFoodItems, setAllFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currency } = useCurrency();
  const currencySymbols = { USD: "$", EUR: "€", GBP: "£" };
  const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:5005" : "";

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
      const response = await fetch(baseUrl + "/menu/foods");
      console.log(response);

      if (!response.ok) {
        throw new Error(
          `Fetching menu items failed with status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setAllFoodItems(data);

      const filteredMenuItems = data.filter(
        (item) => item.title.toLowerCase() === activeMeal.toLowerCase()
      );
      setMenuItems(filteredMenuItems);
    } catch (err) {
      console.error("Failed to fetch menu items:", err);
      setError(`Unable to load menu. Error: ${err.message}`);

      const sampleData = generateSampleData();
      setAllFoodItems(sampleData);
      setMenuItems(sampleData.filter((item) => item.title === activeMeal));
    } finally {
      setLoading(false);
    }
  }, [activeMeal]);

  const generateSampleData = () => {
    return Array.from({ length: 40 }, (_, i) => ({
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
  };

  useEffect(() => {
    fetchMenuItems();
  }, [activeMeal, fetchMenuItems]);

  return (
    <main className="bg-[#fdfbf7] text-gray-800">
      <HeroSection
        title="Culinary Elegance"
        subtitle="Indulge in an Exquisite Culinary Journey"
        backgroundImage="https://img.freepik.com/premium-photo/chef-is-carefully-plating-dish-restaurant-kitchen-plate-is-arranged-with-variety-colorful-vegetables-small-portion-meat_36682-6799.jpg"
      />

      <MealSelector activeMeal={activeMeal} setActiveMeal={setActiveMeal} />

      <section className="max-w-screen-xl mx-auto px-4 mb-16">
        <h3 className="text-2xl font-semibold mb-6 text-center text-[#8E7037]">
          {activeMeal} Menu
        </h3>
        <MenuList
          items={menuItems}
          activeMeal={activeMeal}
          loading={loading}
          error={error}
          currencySymbol={currencySymbols[currency]}
        />
      </section>

      <ReservationForm />

      <RestaurantGallery
        loading={loading}
        allItems={allFoodItems}
        openModal={openModal}
        modalOpen={modalOpen}
        selectedItem={selectedItem}
        closeModal={closeModal}
      />
    </main>
  );
}
