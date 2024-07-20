import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createEvent(data: {
  title: string;
  description: string;
  category: string;
  location: string;
  price: number;
  ticketsAvailable: number;
  date: Date;
  imageUrl?: string;
}) {
  const existingEvent = await prisma.event.findFirst({
    where: { title: data.title },
  });

  if (existingEvent) {
    throw new Error('Event already exists');
  }

  return await prisma.event.create({
    data,
  });
}

export async function getAllEvents() {
  return await prisma.event.findMany();
}

export async function getEventById(eventId: string) {
  return await prisma.event.findUnique({
    where: { id: eventId },
  });
}

export async function updateEvent(eventId: string, data: {
  title: string;
  description: string;
  category: string;
  location: string;
  price: number;
  ticketsAvailable: number;
  date: Date;
  imageUrl?: string;
}) {
  return await prisma.event.update({
    where: { id: eventId },
    data,
  });
}

export async function deleteEvent(eventId: string) {
  return await prisma.event.delete({
    where: { id: eventId },
  });
}

export async function bookTicket(eventId: string, userId: string, ticketCount: number) {
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event || event.ticketsAvailable < ticketCount) {
    throw new Error('Not enough tickets available');
  }

  const booking = await prisma.booking.create({
    data: {
      eventId,
      userId,
      ticketCount,
      totalPrice: ticketCount * event.price,
    },
  });

  await prisma.event.update({
    where: { id: eventId },
    data: {
      ticketsAvailable: event.ticketsAvailable - ticketCount,
    },
  });

  return booking;
}

export async function calculateEarnings(eventId: string) {
  const bookings = await prisma.booking.findMany({
    where: { eventId },
    select: { totalPrice: true },
  });

  return bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
}

export async function getTotalEvents() {
  return await prisma.event.count();
}
