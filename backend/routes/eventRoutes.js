import express from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import {isAdmin} from "../middlewares/isAdmin.js"
import {auth} from "../middlewares/authentication.js"

const router = express.Router();

// GET all events
router.get('/', getAllEvents);

// GET single event by ID
router.get('/:id', getEventById);

// POST new event
router.post('/', auth, isAdmin, createEvent);

// PUT update event
router.put('/:id', updateEvent);

// DELETE event
router.delete('/:id', deleteEvent);

export default router;
