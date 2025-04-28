import express from 'express';
import { readQrCode } from '../controllers/qrController.js';

const qrRouter = express.Router();

qrRouter.post('/:eventId/read', readQrCode); // Route to read QR code   


export {qrRouter};