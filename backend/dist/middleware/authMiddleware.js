"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = 'pass'; // Replace with your actual secret
function authMiddleware(req, res, next) {
    var _a;
    // Get token from headers
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authorization token is missing' });
    }
    try {
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        // Attach decoded user info to request object
        req.user = { userId: decoded.userId, email: decoded.email, name: decoded.name };
        // Proceed to next middleware or route handler
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}
exports.authMiddleware = authMiddleware;
