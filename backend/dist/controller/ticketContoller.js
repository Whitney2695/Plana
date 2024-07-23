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
exports.TicketController = void 0;
const ticketService_1 = require("../services/ticketService");
class TicketController {
    static buyTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, eventId, ticketCount } = req.body;
            try {
                const { ticket, totalAmount } = yield ticketService_1.TicketService.buyTicket(userId, eventId, ticketCount);
                res.status(201).json({ ticket, totalAmount });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updateTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ticketId, ticketCount } = req.body;
            try {
                const updatedTicket = yield ticketService_1.TicketService.updateTicket(ticketId, ticketCount);
                res.json({ updatedTicket });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static cancelTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ticketId } = req.params;
            try {
                const result = yield ticketService_1.TicketService.cancelTicket(ticketId);
                res.json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAllTicketsForUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const tickets = yield ticketService_1.TicketService.getAllTicketsForUser(userId);
                res.json(tickets);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getUsersForEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eventId } = req.params;
            try {
                const users = yield ticketService_1.TicketService.getUsersForEvent(eventId);
                res.json(users);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAllUsersWithTickets(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield ticketService_1.TicketService.getAllUsersWithTickets();
                res.json(users);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getTotalTicketsForEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eventId } = req.params;
            try {
                const { totalTickets } = yield ticketService_1.TicketService.getTotalTicketsForEvent(eventId);
                res.json({ totalTickets });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getTotalMoneyForEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eventId } = req.params;
            try {
                const { totalMoney } = yield ticketService_1.TicketService.getTotalMoneyForEvent(eventId);
                res.json({ totalMoney });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getTotalMoneyForAllEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { totalMoney } = yield ticketService_1.TicketService.getTotalMoneyForAllEvents();
                res.json({ totalMoney });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getTotalTicketsForAllEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { totalTickets } = yield ticketService_1.TicketService.getTotalTicketsForAllEvents();
                res.json({ totalTickets });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TicketController = TicketController;
