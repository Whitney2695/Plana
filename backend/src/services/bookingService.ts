// src/services/bookingService.ts

import { prisma } from '../server';

export class BookingService {
  async getBookingsByEvent(eventId: string) {
    try {
      const bookings = await prisma.booking.findMany({
        where: {
          eventId,
        },
        select: {
          user: {
            select: {
              name: true,
              email: true,
              phoneNumber: true,
            },
          },
          ticketCount: true,
          totalPrice: true,
        },
      });
      return bookings;
    } catch (error) {
      throw new Error(`Failed to fetch bookings for event: ${error}`);
    }
  }
}
