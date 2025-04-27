import express from 'express';
import { allEvents } from '../controllers/eventController.js';
import { createEvent } from '../controllers/eventController.js';
import { registerEvent } from '../controllers/eventController.js';
import { getRegisteredEvents } from '../controllers/eventController.js';
import { getRegisteredUsers } from '../controllers/eventController.js';

const eventRouter = express.Router();

//list of all events
eventRouter.get('/all', allEvents);

//creating new Event
eventRouter.post('/:userId/create', createEvent);

//registering for an event
eventRouter.post('/:eventId/register/:userId', registerEvent);

//Listing all registered events for a user
eventRouter.get('/:userId/register/all', getRegisteredEvents);

//listing all registered users for an event
eventRouter.get('/all/:eventId', getRegisteredUsers);



export {eventRouter};