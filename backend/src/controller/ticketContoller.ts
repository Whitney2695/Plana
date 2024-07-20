import { Request, Response, NextFunction } from 'express';
import { TicketService } from '../services/ticketService';

export class TicketController {
  static async buyTicket(req: Request, res: Response, next: NextFunction) {
    const { userId, eventId, ticketCount } = req.body as { userId: string; eventId: string; ticketCount: number };

    try {
      const { ticket, totalAmount } = await TicketService.buyTicket(userId, eventId, ticketCount);
      res.status(201).json({ ticket, totalAmount });
    } catch (error) {
      next(error);
    }
  }

  static async cancelTicket(req: Request, res: Response, next: NextFunction) {
    const { ticketId } = req.params;

    try {
      const canceledTicket = await TicketService.cancelTicket(ticketId);
      res.json({ message: 'Ticket successfully canceled.' });
    } catch (error) {
      next(error);
    }
  }

  static async getAllTicketsForUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;

    try {
      const tickets = await TicketService.getAllTicketsForUser(userId);
      res.json(tickets);
    } catch (error) {
      next(error);
    }
  }

  static async getUsersForEvent(req: Request, res: Response, next: NextFunction) {
    const { eventId } = req.params;

    try {
      const users = await TicketService.getUsersForEvent(eventId);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getAllUsersWithTickets(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await TicketService.getAllUsersWithTickets();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getTotalTicketsForEvent(req: Request, res: Response, next: NextFunction) {
    const { eventId } = req.params;

    try {
      const totalTickets = await TicketService.getTotalTicketsForEvent(eventId);
      res.json({ totalTickets });
    } catch (error) {
      next(error);
    }
  }

  static async getTotalMoneyForEvent(req: Request, res: Response, next: NextFunction) {
    const { eventId } = req.params;

    try {
      const totalMoney = await TicketService.getTotalMoneyForEvent(eventId);
      res.json({ totalMoney });
    } catch (error) {
      next(error);
    }
  }

  static async getTotalMoneyForAllEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const totalMoney = await TicketService.getTotalMoneyForAllEvents();
      res.json({ totalMoney });
    } catch (error) {
      next(error);
    }
  }
}
