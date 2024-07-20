import { Request, Response } from 'express';
import * as eventService from '../services/eventService';

class EventController {
  async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const event = await eventService.createEvent(req.body);
      res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
      const err = error as Error;
      if (err.message === 'Event already exists') {
        res.status(400).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  }

  async getAllEvents(req: Request, res: Response): Promise<void> {
    try {
      const events = await eventService.getAllEvents();
      res.status(200).json(events);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  }

  async getEventById(req: Request, res: Response): Promise<void> {
    try {
      const event = await eventService.getEventById(req.params.id);
      res.status(200).json(event);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  }

  async updateEvent(req: Request, res: Response): Promise<void> {
    try {
      const event = await eventService.updateEvent(req.params.id, req.body);
      res.status(200).json({ message: 'Event updated successfully', event });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  }

  async deleteEvent(req: Request, res: Response): Promise<void> {
    try {
      await eventService.deleteEvent(req.params.id);
      res.status(204).json({ message: 'Event deleted successfully' });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  }

  async bookTicket(req: Request, res: Response): Promise<void> {
    try {
      const { eventId, userId, ticketCount } = req.body;
      const booking = await eventService.bookTicket(eventId, userId, ticketCount);
      res.status(201).json({ message: 'Ticket booked successfully', booking });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  }

  async calculateEarnings(req: Request, res: Response): Promise<void> {
    try {
      const totalEarnings = await eventService.calculateEarnings(req.params.id);
      res.status(200).json({ totalEarnings });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  }

  async getTotalEvents(req: Request, res: Response): Promise<void> {
    try {
      const totalEvents = await eventService.getTotalEvents();
      res.status(200).json({ totalEvents });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  }
}

export default new EventController();
