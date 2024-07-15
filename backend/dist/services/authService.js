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
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const jwtSecret = 'pass'; // Replace with your actual secret
class AuthService {
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find user by email
            const user = yield prisma.user.findUnique({ where: { email: email } });
            if (!user) {
                console.log('User not found');
                throw new Error('User not found');
            }
            console.log('User found:', user);
            // Verify password
            const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
            console.log('Input Password:', password);
            console.log('Stored Password:', user.password);
            console.log('Password match result:', passwordMatch);
            if (!passwordMatch) {
                throw new Error('Invalid password');
            }
            // Generate JWT token
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
            return { token, user };
        });
    }
}
exports.AuthService = AuthService;
