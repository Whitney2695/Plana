"use strict";
// src/controllers/bookingController.ts
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
exports.getBookingsByEvent = void 0;
const bookingService_1 = require("../services/bookingService");
const bookingService = new bookingService_1.BookingService();
const getBookingsByEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.params;
    try {
        const bookings = yield bookingService.getBookingsByEvent(eventId);
        res.status(200).json(bookings);
    }
    catch (error) { // Explicitly define error type
        res.status(500).json({ error: error.message });
    }
});
exports.getBookingsByEvent = getBookingsByEvent;
