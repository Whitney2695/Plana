import express from 'express';
import { TicketController } from '../controller/ticketContoller';

const router = express.Router();

// Route to buy tickets
router.post('/buy', TicketController.buyTicket);

// Route to cancel a specific ticket
router.delete('/cancel/:ticketId', TicketController.cancelTicket);

// Route to get all tickets for a specific user
router.get('/user/:userId', TicketController.getAllTicketsForUser);

// Route to get users who booked a specific event
router.get('/event/:eventId/users', TicketController.getUsersForEvent);

// Route to get all users with tickets
router.get('/users', TicketController.getAllUsersWithTickets);

export default router;
