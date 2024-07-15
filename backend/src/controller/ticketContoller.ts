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
      res.json({ message: `Ticket successfully canceled.` }); // Return success message
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
}
