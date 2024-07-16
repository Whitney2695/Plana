// src/routes/bookingRoutes.ts

import express from 'express';
import { getBookingsByEvent } from '../controller/bookingController';

const router = express.Router();

router.get('/bookings/:eventId', getBookingsByEvent);

export default router;
