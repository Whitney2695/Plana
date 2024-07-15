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

    await transporter.sendMail(mailOptions);
    console.log('Registration email sent successfully');
  } catch (error) {
    console.error('Error sending registration email:', error);
    throw error;
  }
}
