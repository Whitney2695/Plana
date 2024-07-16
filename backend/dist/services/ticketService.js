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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const client_1 = require("@prisma/client");
const nodemailer_1 = __importDefault(require("nodemailer"));
const prisma = new client_1.PrismaClient();
class TicketService {
    static buyTicket(userId, eventId, ticketCount) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield prisma.event.findUnique({
                where: { id: eventId },
                select: { id: true, ticketsAvailable: true, price: true }
            });
            if (!event) {
                throw new Error(`Event with ID ${eventId} not found.`);
            }
            if (event.ticketsAvailable < ticketCount) {
                throw new Error(`Not enough tickets available for event.`);
            }
            const ticket = yield prisma.ticket.create({
                data: {
                    userId,
                    eventId,
                    ticketCount,
                }
            });
            const totalAmount = ticketCount * event.price;
            // Fetch user details
            const user = yield prisma.user.findUnique({
                where: { id: userId },
                select: { email: true, name: true }
            });
            if (!user) {
                throw new Error(`User with ID ${userId} not found.`);
            }
            // Check if user has an email address
            if (!user.email) {
                throw new Error('User email address is not provided.');
            }
            // Send confirmation email
            yield TicketService.sendConfirmationEmail(user.email, user === null || user === void 0 ? void 0 : user.name, ticketCount, totalAmount);
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
    static getUsersForEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.ticket.findMany({
                where: { eventId },
                include: {
                    user: true,
                    event: true
                }
            });
            return users.map(ticket => ({
                user: ticket.user,
                ticketCount: ticket.ticketCount,
                totalPrice: ticket.ticketCount * ticket.event.price
            }));
        });
    }
    static getAllUsersWithTickets() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.user.findMany({
                include: {
                    tickets: {
                        include: {
                            event: true
                        }
                    }
                }
            });
            return users.map(user => (Object.assign(Object.assign({}, user), { tickets: user.tickets.map(ticket => (Object.assign(Object.assign({}, ticket), { totalPrice: ticket.ticketCount * ticket.event.price }))) })));
        });
    }
    static sendConfirmationEmail(to, name, ticketCount, totalAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to,
                subject: 'Ticket Purchase Confirmation',
                text: `Dear ${name},\n\nThank you for your purchase! You have successfully bought ${ticketCount} tickets for a total amount of $${totalAmount.toFixed(2)}.\n\nBest regards,\nYour Event Team`,
            };
            try {
                yield transporter.sendMail(mailOptions);
                console.log('Email sent successfully');
            }
            catch (error) {
                console.error('Error sending email:', error);
                throw new Error('Failed to send confirmation email');
            }
        });
    }
}
exports.TicketService = TicketService;
