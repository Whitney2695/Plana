"use strict";
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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class TicketService {
    static buyTicket(userId, eventId, ticketCount) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield prisma.event.findUnique({
                where: { id: eventId },
                select: { id: true, ticketsAvailable: true, price: true } // Adjusted to 'ticketsAvailable'
            });
            if (!event) {
                throw new Error(`Event with ID ${eventId} not found.`);
            }
            if (event.ticketsAvailable < ticketCount) { // Updated to 'ticketsAvailable'
                throw new Error(`Not enough tickets available for event.`);
            }
            const ticket = yield prisma.ticket.create({
                data: {
                    userId,
                    eventId,
                    ticketCount,
                }
            });
            // Calculate total amount based on event price
            const totalAmount = ticketCount * event.price;
            return { ticket, totalAmount };
        });
    }
    static cancelTicket(ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield prisma.ticket.findUnique({
                where: { id: ticketId }
            });
            if (!ticket) {
                throw new Error(`Ticket with ID ${ticketId} not found.`);
            }
            yield prisma.ticket.delete({
                where: { id: ticketId }
            });
            return ticket;
        });
    }
    static getAllTicketsForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tickets = yield prisma.ticket.findMany({
                where: { userId },
                include: {
                    event: true
                }
            });
            return tickets;
        });
    }
}
exports.TicketService = TicketService;
