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
exports.TicketEmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
console.log('Email User:', process.env.EMAIL_USER); // Log to verify
console.log('Email Password:', process.env.EMAIL_PASSWORD); // Log to verify
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});
class TicketEmailService {
    static sendTicketPurchaseEmail(userEmail, ticketCount, totalAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: process.env.EMAIL_USER, // sender address
                to: userEmail, // recipient address
                subject: 'Ticket Purchase Confirmation', // Subject line
                html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f8f9fa;">
          <h1 style="color: #007bff;">Thank you for your purchase!</h1>
          <p style="font-size: 18px; color: #343a40;">
            You bought <strong>${ticketCount} tickets</strong>.
          </p>
          <p style="font-size: 18px; color: red;">
            Total amount: <strong>$${totalAmount.toFixed(2)}</strong>
          </p>
          <p style="font-size: 16px; color: #6c757d;">
            We appreciate your business and look forward to seeing you at the event.
          </p>
        </div>
      `, // HTML body content
            };
            try {
                yield transporter.sendMail(mailOptions);
                console.log('Email sent successfully');
            }
            catch (error) {
                console.error('Error sending email:', error);
                throw new Error('Failed to send email');
            }
        });
    }
}
exports.TicketEmailService = TicketEmailService;
