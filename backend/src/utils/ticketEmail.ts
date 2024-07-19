import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

console.log('Email User:', process.env.EMAIL_USER); // Log to verify
console.log('Email Password:', process.env.EMAIL_PASSWORD); // Log to verify

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export class TicketEmailService {
  static async sendTicketPurchaseEmail(userEmail: string, ticketCount: number, totalAmount: number) {
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
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
