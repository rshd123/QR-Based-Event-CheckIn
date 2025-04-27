import express from 'express';
import { allEvents } from '../controllers/eventController.js';
import { createEvent } from '../controllers/eventController.js';
import { registerEvent } from '../controllers/eventController.js';
import { getRegisteredEvents } from '../controllers/eventController.js';
import { getRegisteredUsers } from '../controllers/eventController.js';
import { getCheckInStats } from '../controllers/eventController.js';
import { exportAttendeeList } from '../controllers/eventController.js';

const eventRouter = express.Router();

// List of all events
eventRouter.get('/all', allEvents);

// Creating new Event
eventRouter.post('/:userId/create', createEvent);

// All Attendee List
eventRouter.get('/register/all', exportAttendeeList)

// Registering for an event
eventRouter.post('/:eventId/register/:userId', registerEvent);

// Generating all registered events for a user
eventRouter.get('/:userId/register/all', getRegisteredEvents);

// Generating all registered users for an event
eventRouter.get('/all/:eventId', getRegisteredUsers);

//Generating CheckInStats
eventRouter.get('/checkin/:eventId',getCheckInStats);



export {eventRouter};