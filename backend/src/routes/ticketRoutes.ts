import express from 'express';
import { TicketController } from '../controller/ticketContoller';

const router = express.Router();

// Route to buy a ticket
router.post('/buy', TicketController.buyTicket);

// Route to update ticket count
router.put('/update', TicketController.updateTicket);

// Route to cancel a ticket
router.delete('/cancel/:ticketId', TicketController.cancelTicket);

// Route to get all tickets for a user
router.get('/user/:userId', TicketController.getAllTicketsForUser);

// Route to get users for an event
router.get('/event/:eventId/users', TicketController.getUsersForEvent);

// Route to get all users with tickets
router.get('/users-with-tickets', TicketController.getAllUsersWithTickets);

// Route to get total tickets for an event
router.get('/event/:eventId/total-tickets', TicketController.getTotalTicketsForEvent);

// Route to get total money for an event
router.get('/event/:eventId/total-money', TicketController.getTotalMoneyForEvent);

// Route to get total money for all events
router.get('/total-money', TicketController.getTotalMoneyForAllEvents);

// Route to get total tickets for all events
router.get('/total-tickets', TicketController.getTotalTicketsForAllEvents);

export default router;
