import MenuItem from "../models/restaurantSchema.js";

// Get all menu items
export const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new menu item
export const createMenuItem = async (req, res) => {
  const { title, name, desc, price, img } = req.body;

  const newMenuItem = new MenuItem({ title, name, desc, price, img });

  try {
    const savedItem = await newMenuItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing menu item
export const updateMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a menu item
export const deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};