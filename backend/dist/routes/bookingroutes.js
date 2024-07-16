"use strict";
// src/routes/bookingRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = require("../controller/bookingController");
const router = express_1.default.Router();
router.get('/bookings/:eventId', bookingController_1.getBookingsByEvent);
exports.default = router;
