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

  static async updateTicket(req: Request, res: Response, next: NextFunction) {
    const { ticketId, ticketCount } = req.body as { ticketId: string; ticketCount: number };

    try {
      const updatedTicket = await TicketService.updateTicket(ticketId, ticketCount);
      res.json({ updatedTicket });
    } catch (error) {
      next(error);
    }
  }

  static async cancelTicket(req: Request, res: Response, next: NextFunction) {
    const { ticketId } = req.params as { ticketId: string };

    try {
      const result = await TicketService.cancelTicket(ticketId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getAllTicketsForUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params as { userId: string };

    try {
      const tickets = await TicketService.getAllTicketsForUser(userId);
      res.json(tickets);
    } catch (error) {
      next(error);
    }
  }

  static async getUsersForEvent(req: Request, res: Response, next: NextFunction) {
    const { eventId } = req.params as { eventId: string };

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
    const { eventId } = req.params as { eventId: string };

    try {
      const { totalTickets } = await TicketService.getTotalTicketsForEvent(eventId);
      res.json({ totalTickets });
    } catch (error) {
      next(error);
    }
  }

  static async getTotalMoneyForEvent(req: Request, res: Response, next: NextFunction) {
    const { eventId } = req.params as { eventId: string };

    try {
      const { totalMoney } = await TicketService.getTotalMoneyForEvent(eventId);
      res.json({ totalMoney });
    } catch (error) {
      next(error);
    }
  }

  static async getTotalMoneyForAllEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const { totalMoney } = await TicketService.getTotalMoneyForAllEvents();
      res.json({ totalMoney });
    } catch (error) {
      next(error);
    }
  }

  static async getTotalTicketsForAllEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const { totalTickets } = await TicketService.getTotalTicketsForAllEvents();
      res.json({ totalTickets });
    } catch (error) {
      next(error);
    }
  }
}
