import { Router } from 'express';
import eventController from '../controller/eventController';

const eventRoutes = Router();

eventRoutes.post('/createEvent', eventController.createEvent);
eventRoutes.get('/getEvents', eventController.getAllEvents);
eventRoutes.get('/getOne/:id', eventController.getEventById);
eventRoutes.put('/update/:id', eventController.updateEvent);
eventRoutes.delete('/delete/:id', eventController.deleteEvent);
eventRoutes.post('/book/:id/book', eventController.bookTicket);
eventRoutes.get('/earning/:id/earnings', eventController.calculateEarnings);
eventRoutes.get('/totalEvents', eventController.getTotalEvents);

export default eventRoutes;
