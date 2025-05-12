export default function MealSelector({ activeMeal, setActiveMeal }) {
  return (
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
  );
}
