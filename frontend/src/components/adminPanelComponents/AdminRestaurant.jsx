import React, { useState, useEffect } from "react";
import { useCurrency } from "../../context/CurrencyContext";


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
      setNewItem({ name: "", price: "", desc: "", img: "", title: "Breakfast" });
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

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl mb-6 font-semibold text-center">Manage Menu Items</h2>

      <table className="table-auto w-full border border-gray-300 mb-8">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Meal Type</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Add New Item Row */}
          <tr>
            <td className="border p-2">
              <input
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="border p-1 rounded text-sm w-full"
                placeholder="Name"
              />
            </td>
            <td className="border p-2">
              <input
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                className="border p-1 rounded text-sm w-full"
                placeholder="Price"
              />
            </td>
            <td className="border p-2">
              <input
                value={newItem.desc}
                onChange={(e) => setNewItem({ ...newItem, desc: e.target.value })}
                className="border p-1 rounded text-sm w-full"
                placeholder="Description"
              />
            </td>
            <td className="border p-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(e.target.files[0]);
                  reader.onload = (data) =>
                    setNewItem({ ...newItem, img: data.target.result });
                }}
                className="border p-1 rounded text-sm w-full"
              />
            </td>
            <td className="border p-2">
              <select
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                className="border p-1 rounded text-sm w-full"
              >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Drink</option>
              </select>
            </td>
            <td className="border p-2 text-center">
              <button
                onClick={handleAddItem}
                className="bg-green-500 text-white text-sm px-3 py-1 rounded hover:bg-green-600"
              >
                Add
              </button>
            </td>
          </tr>

          {/* Menu Items */}
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-4">Loading...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="6" className="text-center text-red-500 py-4">{error}</td>
            </tr>
          ) : menuItems.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">No menu items found.</td>
            </tr>
          ) : (
            menuItems.map((item) => (
              <tr key={item._id}>
                {editItemId === item._id ? (
                  <>
                    <td className="border p-2">
                      <input
                        value={editFormData.name}
                        onChange={(e) => handleEditChange("name", e.target.value)}
                        className="border p-1 rounded text-sm w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        value={editFormData.price}
                        onChange={(e) => handleEditChange("price", e.target.value)}
                        className="border p-1 rounded text-sm w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        value={editFormData.desc}
                        onChange={(e) => handleEditChange("desc", e.target.value)}
                        className="border p-1 rounded text-sm w-full"
                      />
                    </td>
                    <td className="border p-2 text-sm text-gray-600">[unchanged]</td>
                    <td className="border p-2">
                      <select
                        value={editFormData.title}
                        onChange={(e) => handleEditChange("title", e.target.value)}
                        className="border p-1 rounded text-sm w-full"
                      >
                        <option>Breakfast</option>
                        <option>Lunch</option>
                        <option>Dinner</option>
                        <option>Drink</option>
                      </select>
                    </td>
                    <td className="border p-2 flex gap-1">
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
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{currencySymbols[currency]}{item.price}</td>
                    <td className="border p-2">{item.desc}</td>
                    <td className="border p-2">
                      <img src={item.img} alt={item.name} className="w-16 h-10 object-cover" />
                    </td>
                    <td className="border p-2">{item.title}</td>
                    <td className="border p-2 flex gap-1">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="bg-yellow-400 text-white text-sm px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white text-sm px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
