"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticketContoller_1 = require("../controller/ticketContoller");
const router = express_1.default.Router();
// Route to buy tickets
router.post('/buy', ticketContoller_1.TicketController.buyTicket);
// Route to cancel a specific ticket
router.delete('/cancel/:ticketId', ticketContoller_1.TicketController.cancelTicket);
// Route to get all tickets for a specific user
router.get('/user/:userId', ticketContoller_1.TicketController.getAllTicketsForUser);
// Route to get users who booked a specific event
router.get('/event/:eventId/users', ticketContoller_1.TicketController.getUsersForEvent);
// Route to get all users with tickets
router.get('/users', ticketContoller_1.TicketController.getAllUsersWithTickets);
exports.default = router;
