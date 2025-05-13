import React from "react";
import { XCircle } from "lucide-react";

export default function RestaurantGallery({
  loading,
  allItems,
  openModal,
  modalOpen,
  selectedItem,
  closeModal,
}) {
  const galleryItems =
    allItems.length >= 40
      ? allItems
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
        }));

  return (
    <section className="py-16 bg-white px-4">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Choose from the Gallery
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Explore our collection of 40 culinary creations
      </p>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin border-4 border-solid border-[#8E7037] border-r-transparent rounded-full"></div>
          <p className="mt-2">Loading gallery...</p>
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer group relative overflow-hidden shadow-lg"
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
              <div className="absolute top-0 right-0 bg-[#8E7037] text-white text-[10px] px-1 py-0.5">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-[#8E7037] hover:text-white hover:bg-[#8E7037] hover:border hover: border-[#8E7037] rounded-full"
              onClick={closeModal}
            >
              <XCircle size={22} />
            </button>

            <img
              src={
                selectedItem.img ||
                `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(
                  selectedItem.name || "Food Item"
                )}`
              }
              alt={selectedItem.name}
              className="w-full h-auto p-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(
                  selectedItem.name || "Food Item"
                )}`;
              }}
            />
            <div className="mt-4 p-5 bg-gray-50">
              <h4 className="text-xl font-semibold">{selectedItem.name}</h4>
              <span className="inline-block bg-[#8E7037] text-white text-xs px-2 py-1 mt-1 mb-2">
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
  );
}
