import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const jwtSecret = 'pass'; // Replace with your actual secret

export class AuthService {
  async loginUser(email: string, password: string): Promise<any> {
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      console.log('User not found');
      throw new Error('User not found');
    }

    console.log('User found:', user);

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Input Password:', password);
    console.log('Stored Password:', user.password);
    console.log('Password match result:', passwordMatch);

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    // Generate JWT token with user details
    const tokenPayload = { userId: user.id, email: user.email, name: user.name, /* add other user details as needed */ };
    const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: '1h' });

    return { token, user };
  }
}
