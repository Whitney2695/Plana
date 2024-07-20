"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = __importDefault(require("../controller/eventController"));
const eventRoutes = (0, express_1.Router)();
eventRoutes.post('/createEvent', eventController_1.default.createEvent);
eventRoutes.get('/getEvents', eventController_1.default.getAllEvents);
eventRoutes.get('/getOne/:id', eventController_1.default.getEventById);
eventRoutes.put('/update/:id', eventController_1.default.updateEvent);
eventRoutes.delete('/delete/:id', eventController_1.default.deleteEvent);
eventRoutes.post('/book/:id/book', eventController_1.default.bookTicket);
eventRoutes.get('/earning/:id/earnings', eventController_1.default.calculateEarnings);
eventRoutes.get('/totalEvents', eventController_1.default.getTotalEvents);
exports.default = eventRoutes;
