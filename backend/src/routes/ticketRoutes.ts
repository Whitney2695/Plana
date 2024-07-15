import express from 'express';
import { TicketController } from '../controller/ticketContoller'; // Adjust path as needed

const router = express.Router();

// Route to buy tickets
router.post('/buy', TicketController.buyTicket);

// Route to cancel a specific ticket
router.delete('/cancel/:ticketId', TicketController.cancelTicket);

// Route to get all tickets for a specific user
router.get('/user/:userId', TicketController.getAllTicketsForUser);

export default router;
