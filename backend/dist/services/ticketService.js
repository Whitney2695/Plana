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
const server_1 = require("../server");
const ticketEmail_1 = require("../utils/ticketEmail"); // Adjust the import path as necessary
class TicketService {
    static buyTicket(userId, eventId, ticketCount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield server_1.prisma.event.findUnique({
                    where: { id: eventId },
                });
                if (!event)
                    throw new Error('Event not found');
                if (event.ticketsAvailable < ticketCount)
                    throw new Error('Not enough tickets available');
                const existingTicket = yield server_1.prisma.ticket.findFirst({
                    where: {
                        userId,
                        eventId,
                    },
                });
                if (existingTicket)
                    throw new Error('Ticket already bought for this event');
                const ticket = yield server_1.prisma.ticket.create({
                    data: {
                        userId,
                        eventId,
                        ticketCount,
                    },
                });
                const totalAmount = event.price * ticketCount;
                yield server_1.prisma.event.update({
                    where: { id: eventId },
                    data: {
                        ticketsAvailable: event.ticketsAvailable - ticketCount,
                    },
                });
                const user = yield server_1.prisma.user.findUnique({ where: { id: userId } });
                if (!user)
                    throw new Error('User not found');
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
    static updateTicket(ticketId, ticketCount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticket = yield server_1.prisma.ticket.findUnique({
                    where: { id: ticketId },
                });
                if (!ticket)
                    throw new Error('Ticket not found');
                const event = yield server_1.prisma.event.findUnique({
                    where: { id: ticket.eventId },
                });
                if (!event)
                    throw new Error('Event not found');
                const newTicketCount = ticket.ticketCount + ticketCount;
                if (newTicketCount < 0)
                    throw new Error('Cannot reduce ticket count below zero');
                const updatedTicket = yield server_1.prisma.ticket.update({
                    where: { id: ticketId },
                    data: {
                        ticketCount: newTicketCount,
                    },
                });
                yield server_1.prisma.event.update({
                    where: { id: ticket.eventId },
                    data: {
                        ticketsAvailable: event.ticketsAvailable - ticketCount,
                    },
                });
                return updatedTicket;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to update ticket: ${error.message}`);
                }
                else {
                    throw new Error('Failed to update ticket: Unknown error');
                }
            }
        });
    }
    static cancelTicket(ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticket = yield server_1.prisma.ticket.findUnique({
                    where: { id: ticketId },
                });
                if (!ticket)
                    throw new Error('Ticket not found');
                const event = yield server_1.prisma.event.findUnique({
                    where: { id: ticket.eventId },
                });
                if (!event)
                    throw new Error('Event not found');
                yield server_1.prisma.ticket.delete({
                    where: { id: ticketId },
                });
                yield server_1.prisma.event.update({
                    where: { id: ticket.eventId },
                    data: {
                        ticketsAvailable: event.ticketsAvailable + ticket.ticketCount,
                    },
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
                const tickets = yield server_1.prisma.ticket.findMany({
                    where: { userId },
                    include: {
                        event: true, // Fetch the associated event details
                    },
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
                const tickets = yield server_1.prisma.ticket.findMany({
                    where: { eventId },
                    include: { user: true },
                });
                return tickets.map(ticket => ticket.user);
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
                const tickets = yield server_1.prisma.ticket.findMany({
                    include: {
                        user: true,
                        event: true, // Ensure event details are included
                    },
                });
                const usersWithTickets = tickets.map(ticket => {
                    const totalAmount = ticket.ticketCount * ticket.event.price;
                    return {
                        user: ticket.user,
                        ticketDetails: {
                            id: ticket.id,
                            eventId: ticket.eventId,
                            ticketCount: ticket.ticketCount,
                            event: {
                                id: ticket.event.id,
                                title: ticket.event.title,
                                description: ticket.event.description,
                                price: ticket.event.price,
                            },
                            totalAmount, // Add totalAmount to the ticketDetails
                        },
                    };
                });
                return usersWithTickets;
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
    static getTotalTicketsForEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tickets = yield server_1.prisma.ticket.findMany({
                    where: { eventId },
                });
                const totalTickets = tickets.reduce((sum, ticket) => sum + ticket.ticketCount, 0);
                return { totalTickets };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch total tickets for event: ${error.message}`);
                }
                else {
                    throw new Error('Failed to fetch total tickets for event: Unknown error');
                }
            }
        });
    }
    static getTotalMoneyForEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield server_1.prisma.event.findUnique({
                    where: { id: eventId },
                });
                if (!event)
                    throw new Error('Event not found');
                const tickets = yield server_1.prisma.ticket.findMany({
                    where: { eventId },
                });
                const totalMoney = tickets.reduce((sum, ticket) => sum + ticket.ticketCount * event.price, 0);
                return { totalMoney };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch total money for event: ${error.message}`);
                }
                else {
                    throw new Error('Failed to fetch total money for event: Unknown error');
                }
            }
        });
    }
    static getTotalMoneyForAllEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield server_1.prisma.event.findMany({
                    include: { tickets: true },
                });
                let totalMoney = 0;
                events.forEach(event => {
                    totalMoney += event.tickets.reduce((sum, ticket) => sum + ticket.ticketCount * event.price, 0);
                });
                return { totalMoney };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch total money for all events: ${error.message}`);
                }
                else {
                    throw new Error('Failed to fetch total money for all events: Unknown error');
                }
            }
        });
    }
    static calculateTotalRevenue() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getTotalMoneyForAllEvents(); // Reusing the existing function
        });
    }
    static calculateEventRevenue(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getTotalMoneyForEvent(eventId); // Reusing the existing function
        });
    }
    static getTotalTicketsForAllEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tickets = yield server_1.prisma.ticket.findMany();
                const totalTickets = tickets.reduce((sum, ticket) => sum + ticket.ticketCount, 0);
                return { totalTickets };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch total tickets for all events: ${error.message}`);
                }
                else {
                    throw new Error('Failed to fetch total tickets for all events: Unknown error');
                }
            }
        });
    }
}
exports.TicketService = TicketService;
