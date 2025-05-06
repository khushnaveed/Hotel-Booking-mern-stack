import React, { useState, useEffect } from "react";
import { useCurrency } from "../../context/CurrencyContext";
import { Pencil, Trash2 } from "lucide-react";

export default function AdminRestaurant() {
  const { currency } = useCurrency();
  const currencySymbols = { USD: "$", EUR: "€", GBP: "£" };

  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    desc: "",
    img: "",
    title: "Breakfast",
  });
  const [editItemId, setEditItemId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    desc: "",
    img: "",
    title: "Breakfast",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API = "http://localhost:5005/menu/foods";

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Failed to fetch menu");
      const data = await res.json();
      setMenuItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (!res.ok) throw new Error("Failed to add item");
      const savedItem = await res.json();
      setMenuItems([savedItem, ...menuItems]);
      setNewItem({
        name: "",
        price: "",
        desc: "",
        img: "",
        title: "Breakfast",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const res = await fetch(`${API}/${_id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete item");
      setMenuItems(menuItems.filter((item) => item._id !== _id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditClick = (item) => {
    setEditItemId(item._id);
    setEditFormData({ ...item });
  };

  const handleEditChange = (field, value) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${API}/${editItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });
      if (!res.ok) throw new Error("Failed to update item");
      const updated = await res.json();
      const updatedItems = menuItems.map((item) =>
        item._id === editItemId ? updated : item
      );
      setMenuItems(updatedItems);
      setEditItemId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const breakfastCount = menuItems.filter(
    (item) => item.title === "Breakfast"
  ).length;
  const lunchCount = menuItems.filter((item) => item.title === "Lunch").length;
  const dinnerCount = menuItems.filter(
    (item) => item.title === "Dinner"
  ).length;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Total Menu items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#8E7037]">
          <p className="text-sm font-medium text-gray-500">Total Menus</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            {menuItems.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#8E7037]">
          <p className="text-sm font-medium text-gray-500">Breakfast Menus</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            {breakfastCount}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#8E7037]">
          <p className="text-sm font-medium text-gray-500">Lunch Menus</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            {lunchCount}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#8E7037]">
          <p className="text-sm font-medium text-gray-500">Dinner Menus</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            {dinnerCount}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Header */}
          <div className="grid grid-cols-[1fr_100px_2fr_200px_100px_100px] gap-2 bg-[#f8efe0] text-[#8E7037] font-semibold px-4 py-3 rounded-t-lg mb-2 text-sm">
            <span>Name</span>
            <span>Price</span>
            <div className="flex justify-center">
              <span>Description</span>
            </div>
            <div className="flex justify-center">
              <span>Image</span>
            </div>

            <span>Meal Type</span>
            <span className="text-center">Action</span>
          </div>

          {/* Add New Item */}
          <div className="grid grid-cols-[1fr_100px_2fr_200px_100px_100px] gap-2 bg-white p-4 mb-2 rounded-lg shadow text-sm items-center">
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="border-gray-500 shadow-sm  p-2 rounded text-sm w-full"
              placeholder="Name"
            />
            <input
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
              className="border-gray-500 shadow-sm  p-2 rounded text-sm w-full"
              placeholder="Price"
            />
            <input
              value={newItem.desc}
              onChange={(e) => setNewItem({ ...newItem, desc: e.target.value })}
              className="border-gray-500 shadow-sm  p-2 rounded text-sm w-full"
              placeholder="Description"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = (data) =>
                  setNewItem({ ...newItem, img: data.target.result });
              }}
              className="border-gray-500 shadow-sm  p-2 rounded text-sm w-full"
            />
            <select
              value={newItem.title}
              onChange={(e) =>
                setNewItem({ ...newItem, title: e.target.value })
              }
              className="border-gray-500 shadow-sm  p-2 rounded text-sm w-full"
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Drink</option>
            </select>
            <button
              onClick={handleAddItem}
              className="bg-[#8E7037] text-white text-sm px-3 py-1 rounded hover:text-[#8E7037] hover:bg-white hover:border-[#8E7037] hover:border "
            >
              Add
            </button>
          </div>

          {/* Conditional Rendering */}
          {loading ? (
            <div className="text-center py-4 text-sm">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-4 text-sm">{error}</div>
          ) : menuItems.length === 0 ? (
            <div className="text-center py-4 text-sm">No menu items found.</div>
          ) : (
            menuItems.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-[1fr_100px_2fr_200px_100px_100px] gap-2 bg-white p-4 mb-2 rounded-lg shadow text-sm items-center"
              >
                {editItemId === item._id ? (
                  <>
                    <input
                      value={editFormData.name}
                      onChange={(e) => handleEditChange("name", e.target.value)}
                      className="border p-1 rounded text-sm w-full"
                    />
                    <input
                      value={editFormData.price}
                      onChange={(e) =>
                        handleEditChange("price", e.target.value)
                      }
                      className="border p-1 rounded text-sm w-full"
                    />
                    <input
                      value={editFormData.desc}
                      onChange={(e) => handleEditChange("desc", e.target.value)}
                      className="border p-1 rounded text-sm w-full"
                    />
                    <span className="text-gray-500 text-xs">[unchanged]</span>
                    <select
                      value={editFormData.title}
                      onChange={(e) =>
                        handleEditChange("title", e.target.value)
                      }
                      className="border p-1 rounded text-sm w-full"
                    >
                      <option>Breakfast</option>
                      <option>Lunch</option>
                      <option>Dinner</option>
                      <option>Drink</option>
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white text-sm px-2 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditItemId(null)}
                        className="bg-gray-300 text-sm px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span>{item.name}</span>
                    <span>
                      {currencySymbols[currency]}
                      {item.price}
                    </span>
                    <span>{item.desc}</span>
                    <div className="flex justify-center">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-25 h-20 object-cover"
                      />
                    </div>

                    <span>{item.title}</span>

                    <div className="flex gap-2 justify-center">
                      <Pencil
                        onClick={() => handleEditClick(item)}
                        className="text-yellow-600 cursor-pointer hover:scale-110 transition-transform"
                        size={18}
                      />
                      <Trash2
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 cursor-pointer hover:scale-110 transition-transform"
                        size={18}
                      />
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
