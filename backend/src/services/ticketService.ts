import { prisma } from '../server';
import { TicketEmailService } from '../utils/ticketEmail'; // Adjust the import path as necessary

export class TicketService {
  static async buyTicket(userId: string, eventId: string, ticketCount: number) {
    try {
      const event = await prisma.event.findUnique({
        where: { id: eventId },
      });
      if (!event) throw new Error('Event not found');
      if (event.ticketsAvailable < ticketCount) throw new Error('Not enough tickets available');

      const existingTicket = await prisma.ticket.findFirst({
        where: {
          userId,
          eventId,
        },
      });

      if (existingTicket) throw new Error('Ticket already bought for this event');

      const ticket = await prisma.ticket.create({
        data: {
          userId,
          eventId,
          ticketCount,
        },
      });

      const totalAmount = event.price * ticketCount;

      await prisma.event.update({
        where: { id: eventId },
        data: {
          ticketsAvailable: event.ticketsAvailable - ticketCount,
        },
      });

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error('User not found');

      await TicketEmailService.sendTicketPurchaseEmail(user.email, ticketCount, totalAmount);

      return { ticket, totalAmount };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to buy ticket: ${error.message}`);
      } else {
        throw new Error('Failed to buy ticket: Unknown error');
      }
    }
  }

  static async updateTicket(ticketId: string, ticketCount: number) {
    try {
      const ticket = await prisma.ticket.findUnique({
        where: { id: ticketId },
      });
      if (!ticket) throw new Error('Ticket not found');

      const event = await prisma.event.findUnique({
        where: { id: ticket.eventId },
      });
      if (!event) throw new Error('Event not found');

      const newTicketCount = ticket.ticketCount + ticketCount;

      if (newTicketCount < 0) throw new Error('Cannot reduce ticket count below zero');

      const updatedTicket = await prisma.ticket.update({
        where: { id: ticketId },
        data: {
          ticketCount: newTicketCount,
        },
      });

      await prisma.event.update({
        where: { id: ticket.eventId },
        data: {
          ticketsAvailable: event.ticketsAvailable - ticketCount,
        },
      });

      return updatedTicket;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to update ticket: ${error.message}`);
      } else {
        throw new Error('Failed to update ticket: Unknown error');
      }
    }
  }

  static async cancelTicket(ticketId: string) {
    try {
      const ticket = await prisma.ticket.findUnique({
        where: { id: ticketId },
      });
      if (!ticket) throw new Error('Ticket not found');

      const event = await prisma.event.findUnique({
        where: { id: ticket.eventId },
      });
      if (!event) throw new Error('Event not found');

      await prisma.ticket.delete({
        where: { id: ticketId },
      });

      await prisma.event.update({
        where: { id: ticket.eventId },
        data: {
          ticketsAvailable: event.ticketsAvailable + ticket.ticketCount,
        },
      });

      return { message: 'Ticket successfully canceled.' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to cancel ticket: ${error.message}`);
      } else {
        throw new Error('Failed to cancel ticket: Unknown error');
      }
    }
  }

  static async getAllTicketsForUser(userId: string) {
    try {
      const tickets = await prisma.ticket.findMany({
        where: { userId },
        include: {
          event: true, // Fetch the associated event details
        },
      });
      return tickets;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch tickets for user: ${error.message}`);
      } else {
        throw new Error('Failed to fetch tickets for user: Unknown error');
      }
    }
  }
  

  static async getUsersForEvent(eventId: string) {
    try {
      const tickets = await prisma.ticket.findMany({
        where: { eventId },
        include: { user: true },
      });
      return tickets.map(ticket => ticket.user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch users for event: ${error.message}`);
      } else {
        throw new Error('Failed to fetch users for event: Unknown error');
      }
    }
  }

  static async getAllUsersWithTickets() {
    try {
      const tickets = await prisma.ticket.findMany({
        include: {
          user: true,
          event: true, // Ensure event details are included
        },
      });
  
      const usersWithTickets = tickets.map(ticket => {
        const totalAmount = ticket.ticketCount * ticket.event.price;
        
        return {
          user: ticket.user,
          ticketDetails: {
            id: ticket.id,
            eventId: ticket.eventId,
            ticketCount: ticket.ticketCount,
            event: {
              id: ticket.event.id,
              title: ticket.event.title,
              description: ticket.event.description,
              price: ticket.event.price,
            },
            totalAmount, // Add totalAmount to the ticketDetails
          },
        };
      });
  
      return usersWithTickets;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch all users with tickets: ${error.message}`);
      } else {
        throw new Error('Failed to fetch all users with tickets: Unknown error');
      }
    }
  }
  

  static async getTotalTicketsForEvent(eventId: string) {
    try {
      const tickets = await prisma.ticket.findMany({
        where: { eventId },
      });
      const totalTickets = tickets.reduce((sum, ticket) => sum + ticket.ticketCount, 0);
      return { totalTickets };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch total tickets for event: ${error.message}`);
      } else {
        throw new Error('Failed to fetch total tickets for event: Unknown error');
      }
    }
  }

  static async getTotalMoneyForEvent(eventId: string) {
    try {
      const event = await prisma.event.findUnique({
        where: { id: eventId },
      });
      if (!event) throw new Error('Event not found');

      const tickets = await prisma.ticket.findMany({
        where: { eventId },
      });

      const totalMoney = tickets.reduce(
        (sum, ticket) => sum + ticket.ticketCount * event.price,
        0
      );

      return { totalMoney };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch total money for event: ${error.message}`);
      } else {
        throw new Error('Failed to fetch total money for event: Unknown error');
      }
    }
  }

  static async getTotalMoneyForAllEvents() {
    try {
      const events = await prisma.event.findMany({
        include: { tickets: true },
      });

      let totalMoney = 0;
      events.forEach(event => {
        totalMoney += event.tickets.reduce(
          (sum, ticket) => sum + ticket.ticketCount * event.price,
          0
        );
      });

      return { totalMoney };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch total money for all events: ${error.message}`);
      } else {
        throw new Error('Failed to fetch total money for all events: Unknown error');
      }
    }
  }

  static async calculateTotalRevenue() {
    return this.getTotalMoneyForAllEvents(); // Reusing the existing function
  }

  static async calculateEventRevenue(eventId: string) {
    return this.getTotalMoneyForEvent(eventId); // Reusing the existing function
  }

  static async getTotalTicketsForAllEvents() {
    try {
      const tickets = await prisma.ticket.findMany();
      const totalTickets = tickets.reduce((sum, ticket) => sum + ticket.ticketCount, 0);
      return { totalTickets };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch total tickets for all events: ${error.message}`);
      } else {
        throw new Error('Failed to fetch total tickets for all events: Unknown error');
      }
    }
  }
}
