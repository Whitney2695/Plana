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
exports.calculateEarnings = exports.bookTicket = exports.deleteEvent = exports.updateEvent = exports.getEventById = exports.getAllEvents = exports.createEvent = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createEvent(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.event.create({
            data,
        });
    });
}
exports.createEvent = createEvent;
function getAllEvents() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.event.findMany();
    });
}
exports.getAllEvents = getAllEvents;
function getEventById(eventId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.event.findUnique({
            where: { id: eventId },
        });
    });
}
exports.getEventById = getEventById;
function updateEvent(eventId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.event.update({
            where: { id: eventId },
            data,
        });
    });
}
exports.updateEvent = updateEvent;
function deleteEvent(eventId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.event.delete({
            where: { id: eventId },
        });
    });
}
exports.deleteEvent = deleteEvent;
function bookTicket(eventId, userId, ticketCount) {
    return __awaiter(this, void 0, void 0, function* () {
        const event = yield prisma.event.findUnique({ where: { id: eventId } });
        if (!event || event.ticketsAvailable < ticketCount) {
            throw new Error('Not enough tickets available');
        }
        const booking = yield prisma.booking.create({
            data: {
                eventId,
                userId,
                ticketCount,
                totalPrice: ticketCount * event.price,
            },
        });
        yield prisma.event.update({
            where: { id: eventId },
            data: {
                ticketsAvailable: event.ticketsAvailable - ticketCount,
            },
        });
        return booking;
    });
}
exports.bookTicket = bookTicket;
function calculateEarnings(eventId) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookings = yield prisma.booking.findMany({
            where: { eventId },
            select: { totalPrice: true },
        });
        return bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
    });
}
exports.calculateEarnings = calculateEarnings;
