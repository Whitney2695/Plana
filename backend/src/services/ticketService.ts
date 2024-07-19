// services/ticketService.ts

import { prisma } from '../server';
import { TicketEmailService } from '../utils/ticketEmail'; // Adjust the import path as necessary

export class TicketService {
  static async buyTicket(userId: string, eventId: string, ticketCount: number) {
    try {
      // Create a new ticket entry in the database
      const ticket = await prisma.ticket.create({
        data: {
          userId,
          eventId,
          ticketCount,
        },
      });

      // Calculate the total amount (e.g., $10 per ticket)
      const totalAmount = ticketCount * 10;

      // Fetch user email based on userId
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error('User not found');

      // Send email notification
      await TicketEmailService.sendTicketPurchaseEmail(user.email, ticketCount, totalAmount);

      return { ticket, totalAmount };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to buy ticket: ${error.message}`);
      } else {
        throw new Error('Failed to buy ticket: Unknown error');
      }
    }
  }

  static async cancelTicket(ticketId: string) {
    try {
      // Delete the ticket entry from the database
      await prisma.ticket.delete({
        where: { id: ticketId },
      });
      return { message: 'Ticket successfully canceled.' };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to cancel ticket: ${error.message}`);
      } else {
        throw new Error('Failed to cancel ticket: Unknown error');
      }
    }
  }

  static async getAllTicketsForUser(userId: string) {
    try {
      // Fetch all tickets for the given user
      const tickets = await prisma.ticket.findMany({
        where: { userId },
      });
      return tickets;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch tickets for user: ${error.message}`);
      } else {
        throw new Error('Failed to fetch tickets for user: Unknown error');
      }
    }
  }

  static async getUsersForEvent(eventId: string) {
    try {
      // Fetch all users for the given event
      const users = await prisma.ticket.findMany({
        where: { eventId },
        include: { user: true },
      });
      return users.map(ticket => ticket.user);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch users for event: ${error.message}`);
      } else {
        throw new Error('Failed to fetch users for event: Unknown error');
      }
    }
  }

  static async getAllUsersWithTickets() {
    try {
      // Fetch all users who have tickets
      const tickets = await prisma.ticket.findMany({
        include: { user: true },
      });
      const users = tickets.map(ticket => ticket.user);
      return users;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch all users with tickets: ${error.message}`);
      } else {
        throw new Error('Failed to fetch all users with tickets: Unknown error');
      }
    }
  }
}
