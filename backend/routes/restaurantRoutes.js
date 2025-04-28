import express from 'express';
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/restaurantController.js';

const router = express.Router();

// Route to get all menu items
router.get('/foods', getMenuItems);

// Route to create a new menu item
router.post('/foods', createMenuItem);

// Route to update a menu item
router.put('/foods/:id', updateMenuItem);

// Route to delete a menu item
router.delete('/foods/:id', deleteMenuItem);

export default router;