import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export class TicketService {
  static async buyTicket(userId: string, eventId: string, ticketCount: number) {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { id: true, ticketsAvailable: true, price: true }
    });

    if (!event) {
      throw new Error(`Event with ID ${eventId} not found.`);
    }

    if (event.ticketsAvailable < ticketCount) {
      throw new Error(`Not enough tickets available for event.`);
    }

    const ticket = await prisma.ticket.create({
      data: {
        userId,
        eventId,
        ticketCount,
      }
    });

    const totalAmount = ticketCount * event.price;

    // Fetch user details
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true }
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    // Check if user has an email address
    if (!user.email) {
      throw new Error('User email address is not provided.');
    }

    // Send confirmation email
    await TicketService.sendConfirmationEmail(user.email, user?.name, ticketCount, totalAmount);

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

  static async getUsersForEvent(eventId: string) {
    const users = await prisma.ticket.findMany({
      where: { eventId },
      include: {
        user: true,
        event: true
      }
    });
    return users.map(ticket => ({
      user: ticket.user,
      ticketCount: ticket.ticketCount,
      totalPrice: ticket.ticketCount * ticket.event.price
    }));
  }

  static async getAllUsersWithTickets() {
    const users = await prisma.user.findMany({
      include: {
        tickets: {
          include: {
            event: true
          }
        }
      }
    });
    return users.map(user => ({
      ...user,
      tickets: user.tickets.map(ticket => ({
        ...ticket,
        totalPrice: ticket.ticketCount * ticket.event.price
      }))
    }));
  }

  private static async sendConfirmationEmail(to: string, name: string, ticketCount: number, totalAmount: number) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER!,
      to,
      subject: 'Ticket Purchase Confirmation',
      text: `Dear ${name},\n\nThank you for your purchase! You have successfully bought ${ticketCount} tickets for a total amount of $${totalAmount.toFixed(2)}.\n\nBest regards,\nYour Event Team`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send confirmation email');
    }
  }
}
