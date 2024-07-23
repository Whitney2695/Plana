"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticketContoller_1 = require("../controller/ticketContoller");
const router = express_1.default.Router();
// Route to buy a ticket
router.post('/buy', ticketContoller_1.TicketController.buyTicket);
// Route to update ticket count
router.put('/update', ticketContoller_1.TicketController.updateTicket);
// Route to cancel a ticket
router.delete('/cancel/:ticketId', ticketContoller_1.TicketController.cancelTicket);
// Route to get all tickets for a user
router.get('/user/:userId', ticketContoller_1.TicketController.getAllTicketsForUser);
// Route to get users for an event
router.get('/event/:eventId/users', ticketContoller_1.TicketController.getUsersForEvent);
// Route to get all users with tickets
router.get('/users-with-tickets', ticketContoller_1.TicketController.getAllUsersWithTickets);
// Route to get total tickets for an event
router.get('/event/:eventId/total-tickets', ticketContoller_1.TicketController.getTotalTicketsForEvent);
// Route to get total money for an event
router.get('/event/:eventId/total-money', ticketContoller_1.TicketController.getTotalMoneyForEvent);
// Route to get total money for all events
router.get('/total-money', ticketContoller_1.TicketController.getTotalMoneyForAllEvents);
// Route to get total tickets for all events
router.get('/total-tickets', ticketContoller_1.TicketController.getTotalTicketsForAllEvents);
exports.default = router;
