"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const eventService = __importStar(require("../services/eventService"));
class EventController {
    createEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield eventService.createEvent(req.body);
                res.status(201).json({ message: 'Event created successfully', event });
            }
            catch (error) {
                const err = error;
                if (err.message === 'Event already exists') {
                    res.status(400).json({ error: err.message });
                }
                else {
                    res.status(500).json({ error: err.message });
                }
            }
        });
    }
    getAllEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield eventService.getAllEvents();
                res.status(200).json(events);
            }
            catch (error) {
                const err = error;
                res.status(500).json({ error: err.message });
            }
        });
    }
    getEventById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield eventService.getEventById(req.params.id);
                res.status(200).json(event);
            }
            catch (error) {
                const err = error;
                res.status(500).json({ error: err.message });
            }
        });
    }
    updateEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield eventService.updateEvent(req.params.id, req.body);
                res.status(200).json({ message: 'Event updated successfully', event });
            }
            catch (error) {
                const err = error;
                res.status(500).json({ error: err.message });
            }
        });
    }
    deleteEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield eventService.deleteEvent(req.params.id);
                res.status(204).json({ message: 'Event deleted successfully' });
            }
            catch (error) {
                const err = error;
                res.status(500).json({ error: err.message });
            }
        });
    }
    bookTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { eventId, userId, ticketCount } = req.body;
                const booking = yield eventService.bookTicket(eventId, userId, ticketCount);
                res.status(201).json({ message: 'Ticket booked successfully', booking });
            }
            catch (error) {
                const err = error;
                res.status(500).json({ error: err.message });
            }
        });
    }
    calculateEarnings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalEarnings = yield eventService.calculateEarnings(req.params.id);
                res.status(200).json({ totalEarnings });
            }
            catch (error) {
                const err = error;
                res.status(500).json({ error: err.message });
            }
        });
    }
    getTotalEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalEvents = yield eventService.getTotalEvents();
                res.status(200).json({ totalEvents });
            }
            catch (error) {
                const err = error;
                res.status(500).json({ error: err.message });
            }
        });
    }
}
exports.default = new EventController();
