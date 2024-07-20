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

// Route to get total tickets for a specific event
router.get('/event/:eventId/total-tickets', TicketController.getTotalTicketsForEvent);

// Route to get total money for a specific event
router.get('/event/:eventId/total-money', TicketController.getTotalMoneyForEvent);

// Route to get total money for all events
router.get('/total-money', TicketController.getTotalMoneyForAllEvents);

export default router;
