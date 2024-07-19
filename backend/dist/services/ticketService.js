"use strict";
// services/ticketService.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const server_1 = require("../server");
const ticketEmail_1 = require("../utils/ticketEmail"); // Adjust the import path as necessary
class TicketService {
    static buyTicket(userId, eventId, ticketCount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Create a new ticket entry in the database
                const ticket = yield server_1.prisma.ticket.create({
                    data: {
                        userId,
                        eventId,
                        ticketCount,
                    },
                });
                // Calculate the total amount (e.g., $10 per ticket)
                const totalAmount = ticketCount * 10;
                // Fetch user email based on userId
                const user = yield server_1.prisma.user.findUnique({ where: { id: userId } });
                if (!user)
                    throw new Error('User not found');
                // Send email notification
                yield ticketEmail_1.TicketEmailService.sendTicketPurchaseEmail(user.email, ticketCount, totalAmount);
                return { ticket, totalAmount };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to buy ticket: ${error.message}`);
                }
                else {
                    throw new Error('Failed to buy ticket: Unknown error');
                }
            }
        });
    }
    static cancelTicket(ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Delete the ticket entry from the database
                yield server_1.prisma.ticket.delete({
                    where: { id: ticketId },
                });
                return { message: 'Ticket successfully canceled.' };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to cancel ticket: ${error.message}`);
                }
                else {
                    throw new Error('Failed to cancel ticket: Unknown error');
                }
            }
        });
    }
    static getAllTicketsForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all tickets for the given user
                const tickets = yield server_1.prisma.ticket.findMany({
                    where: { userId },
                });
                return tickets;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch tickets for user: ${error.message}`);
                }
                else {
                    throw new Error('Failed to fetch tickets for user: Unknown error');
                }
            }
        });
    }
    static getUsersForEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all users for the given event
                const users = yield server_1.prisma.ticket.findMany({
                    where: { eventId },
                    include: { user: true },
                });
                return users.map(ticket => ticket.user);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch users for event: ${error.message}`);
                }
                else {
                    throw new Error('Failed to fetch users for event: Unknown error');
                }
            }
        });
    }
    static getAllUsersWithTickets() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all users who have tickets
                const tickets = yield server_1.prisma.ticket.findMany({
                    include: { user: true },
                });
                const users = tickets.map(ticket => ticket.user);
                return users;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch all users with tickets: ${error.message}`);
                }
                else {
                    throw new Error('Failed to fetch all users with tickets: Unknown error');
                }
            }
        });
    }
}
exports.TicketService = TicketService;
