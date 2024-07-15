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
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Welcome to Event Plana!',
                text: `Hello ${name},

Welcome to Event Plana!

We are thrilled to have you join our community of event enthusiasts. At Event Plana, we strive to bring you the best experiences and make your event planning journey seamless and enjoyable.

Here are a few things you can look forward to: 
- Explore a wide range of events happening around you
- Seamlessly book tickets and manage your reservations
- Stay updated with the latest event news and updates
- Get personalized recommendations based on your interests

We believe that every event should be memorable, and we are here to ensure you have the best experience possible.

If you have any questions or need assistance, feel free to reach out to our support team at support@eventplana.com.

Thank you for joining us, and we look forward to seeing you at our events!

Best regards,
The Event Plana Team`
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
