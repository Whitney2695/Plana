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
exports.sendRegistrationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
function sendRegistrationEmail(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, name }) {
        try {
            const transporter = nodemailer_1.default.createTransport({
                host: 'smtp.gmail.com',
                port: 587, // Set the port to 587
                secure: false, // Set secure to false
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Welcome to Event Plana!',
                html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; margin-left: 20px;">
          <div style="background-color: black; padding: 20px; border-radius: 10px; display: inline-block;">
            <h2 style="color: purple;">Hello ${name},</h2>
            <p style="font-family: 'Times New Roman', Times, serif; color: red;">Welcome to Event Plana!</p>
            <p style="font-family: Georgia, 'Times New Roman', Times, serif; color: green;">We are thrilled to have you join our community of event enthusiasts.</p>
            <p style="font-family: Georgia, 'Times New Roman', Times, serif; color: blue;">Explore events, book tickets, and stay updated with the latest event news.</p>
            <p style="font-family: Verdana, Geneva, Tahoma, sans-serif; color: orange;">If you have any questions, reach out to our support team at <a href="mailto:support@eventplana.com" style="color: red;">support@eventplana.com</a>.</p>
            <p style="color: black;">Thank you for joining us, and we look forward to seeing you at our events!</p>
            <p>Best regards,<br><span style="color: purple;">The Event Plana Team</span></p>
          </div>
        </div>
      `,
            };
            yield transporter.sendMail(mailOptions);
            console.log('Registration email sent successfully');
        }
        catch (error) {
            console.error('Error sending registration email:', error);
            throw error;
        }
    });
}
exports.sendRegistrationEmail = sendRegistrationEmail;
