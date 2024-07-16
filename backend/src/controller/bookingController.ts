// src/controllers/bookingController.ts

import { Request, Response } from 'express';
import { BookingService } from '../services/bookingService';

const bookingService = new BookingService();

export const getBookingsByEvent = async (req: Request, res: Response) => {
  const { eventId } = req.params;

  try {
    const bookings = await bookingService.getBookingsByEvent(eventId);
    res.status(200).json(bookings);
  } catch (error: any) { // Explicitly define error type
    res.status(500).json({ error: error.message });
  }
};
