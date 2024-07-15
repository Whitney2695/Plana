"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = __importDefault(require("../controller/eventController"));
const router = (0, express_1.Router)();
router.post('/events', eventController_1.default.createEvent);
router.get('/events', eventController_1.default.getAllEvents);
router.get('/events/:id', eventController_1.default.getEventById);
router.put('/events/:id', eventController_1.default.updateEvent);
router.delete('/events/:id', eventController_1.default.deleteEvent);
router.post('/events/:id/book', eventController_1.default.bookTicket);
router.get('/events/:id/earnings', eventController_1.default.calculateEarnings);
exports.default = router;
