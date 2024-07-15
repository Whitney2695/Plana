import { Request, Response } from 'express';
import * as eventService from '../services/eventService';

class EventController {
  async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const event = await eventService.createEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getAllEvents(req: Request, res: Response): Promise<void> {
    try {
      const events = await eventService.getAllEvents();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getEventById(req: Request, res: Response): Promise<void> {
    try {
      const event = await eventService.getEventById(req.params.id);
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async updateEvent(req: Request, res: Response): Promise<void> {
    try {
      const event = await eventService.updateEvent(req.params.id, req.body);
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async deleteEvent(req: Request, res: Response): Promise<void> {
    try {
      await eventService.deleteEvent(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async bookTicket(req: Request, res: Response): Promise<void> {
    try {
      const { eventId, userId, ticketCount } = req.body;
      const booking = await eventService.bookTicket(eventId, userId, ticketCount);
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async calculateEarnings(req: Request, res: Response): Promise<void> {
    try {
      const totalEarnings = await eventService.calculateEarnings(req.params.id);
      res.status(200).json({ totalEarnings });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default new EventController();
