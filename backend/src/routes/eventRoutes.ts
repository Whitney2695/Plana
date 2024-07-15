import { Router } from 'express';
import eventController from '../controller/eventController';

const router = Router();

router.post('/events', eventController.createEvent);
router.get('/events', eventController.getAllEvents);
router.get('/events/:id', eventController.getEventById);
router.put('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);
router.post('/events/:id/book', eventController.bookTicket);
router.get('/events/:id/earnings', eventController.calculateEarnings);

export default router;
