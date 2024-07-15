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
    static cancelTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ticketId } = req.params;
            try {
                const canceledTicket = yield ticketService_1.TicketService.cancelTicket(ticketId);
                res.json({ message: `Ticket successfully canceled.` }); // Return success message
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
}
exports.TicketController = TicketController;
