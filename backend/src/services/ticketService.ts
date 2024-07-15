import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TicketService {
  static async buyTicket(userId: string, eventId: string, ticketCount: number) {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { id: true, ticketsAvailable: true, price: true } // Adjusted to 'ticketsAvailable'
    });

    if (!event) {
      throw new Error(`Event with ID ${eventId} not found.`);
    }

    if (event.ticketsAvailable < ticketCount) { // Updated to 'ticketsAvailable'
      throw new Error(`Not enough tickets available for event.`);
    }

    const ticket = await prisma.ticket.create({
      data: {
        userId,
        eventId,
        ticketCount,
      }
    });

    // Calculate total amount based on event price
    const totalAmount = ticketCount * event.price;

    return { ticket, totalAmount };
  }

  static async cancelTicket(ticketId: string) {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId }
    });

    if (!ticket) {
      throw new Error(`Ticket with ID ${ticketId} not found.`);
    }

    await prisma.ticket.delete({
      where: { id: ticketId }
    });

    return ticket;
  }

  static async getAllTicketsForUser(userId: string) {
    const tickets = await prisma.ticket.findMany({
      where: { userId },
      include: {
        event: true
      }
    });
    return tickets;
  }
}
