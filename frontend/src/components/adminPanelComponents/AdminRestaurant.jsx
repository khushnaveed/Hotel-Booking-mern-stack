import React, { useState, useEffect } from "react";
import { useCurrency } from "../../context/CurrencyContext";
import { Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

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
      {/* Summary Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {[
          ["Total Menus", menuItems.length],
          ["Breakfast Menus", breakfastCount],
          ["Lunch Menus", lunchCount],
          ["Dinner Menus", dinnerCount],
        ].map(([label, count], i) => (
          <motion.div
            key={label}
            className="bg-white rounded-lg shadow p-6 border-l-4 border-[#8E7037]"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              <CountUp end={count} duration={1.5} />
            </p>
          </motion.div>
        ))}
      </motion.div>

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
          <motion.div
            className="grid grid-cols-[1fr_100px_2fr_200px_100px_100px] gap-2 bg-white p-4 mb-2 rounded-lg shadow text-sm items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="border-gray-300 p-3 shadow-sm w-full bg-gray-100"
              placeholder="Name"
            />
            <input
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
              className="border-gray-300 p-3 shadow-sm w-full bg-gray-100"
              placeholder="Price"
            />
            <input
              value={newItem.desc}
              onChange={(e) => setNewItem({ ...newItem, desc: e.target.value })}
              className="border-gray-300 p-3 shadow-sm w-full bg-gray-100"
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
              className="border-gray-300 p-3 shadow-sm w-full bg-gray-100"
            />
            <select
              value={newItem.title}
              onChange={(e) =>
                setNewItem({ ...newItem, title: e.target.value })
              }
              className="border-gray-300 p-3 shadow-sm w-full bg-gray-100"
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Drink</option>
            </select>
            <button
              onClick={handleAddItem}
              className="bg-[#8E7037] text-white px-3 py-2 hover:bg-white hover:text-[#8E7037] hover:border hover:border-[#8E7037] transition-all duration-200"
            >
              Add
            </button>
          </motion.div>

          {/* Items */}
          {loading ? (
            <div className="text-center py-4 text-sm">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-4 text-sm">{error}</div>
          ) : menuItems.length === 0 ? (
            <div className="text-center py-4 text-sm">No menu items found.</div>
          ) : (
            menuItems.map((item, index) => (
              <motion.div
                key={item._id}
                className="grid grid-cols-[1fr_100px_2fr_200px_100px_100px] gap-2 bg-white p-4 mb-2 rounded-lg shadow text-sm items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {editItemId === item._id ? (
                  <>
                    <input
                      value={editFormData.name}
                      onChange={(e) => handleEditChange("name", e.target.value)}
                      className="border-gray-300 p-3 shadow-sm w-full bg-gray-100"
                    />
                    <input
                      value={editFormData.price}
                      onChange={(e) =>
                        handleEditChange("price", e.target.value)
                      }
                      className="border-gray-300 p-3 shadow-sm w-full bg-gray-100"
                    />
                    <input
                      value={editFormData.desc}
                      onChange={(e) => handleEditChange("desc", e.target.value)}
                      className="border-gray-300 p-3 shadow-sm w-full bg-gray-100"
                    />
                    <span className="text-gray-500 text-xs">[unchanged]</span>
                    <select
                      value={editFormData.title}
                      onChange={(e) =>
                        handleEditChange("title", e.target.value)
                      }
                      className="border-gray-300 p-3 shadow-sm w-full bg-gray-100"
                    >
                      <option>Breakfast</option>
                      <option>Lunch</option>
                      <option>Dinner</option>
                      <option>Drink</option>
                    </select>
                    <div className="flex gap-2 flex-col pl-4">
                      <button
                        onClick={handleSave}
                        className="bg-[#8E7037] w-18 text-white px-3 py-1 hover:bg-white hover:border hover:border-[#8E7037] hover:text-[#8E7037]"
                        >
                        Save
                      </button>
                      <button
                        onClick={() => setEditItemId(null)}
                        className="bg-white w-18 border border-[#8E7037] text-[#8E7037] px-3 py-1  hover:bg-gray-100"
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
                        className="w-24 h-20 object-cover rounded shadow-sm"
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
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
