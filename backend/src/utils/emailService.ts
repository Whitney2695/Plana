import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

interface EmailOptions {
  email: string;
  name: string;
}

export async function sendRegistrationEmail({ email, name }: EmailOptions): Promise<void> {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, // Set the port to 587
      secure: false, // Set secure to false
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASSWORD!,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER!,
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

    await transporter.sendMail(mailOptions);
    console.log('Registration email sent successfully');
  } catch (error) {
    console.error('Error sending registration email:', error);
    throw error;
  }
}
