import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as { email: string, password: string };

    try {
      // Authenticate user using AuthService
      const { token, user } = await authService.loginUser(email, password);

      // Return token and user information
      res.json({ token, user });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Login error:', error.message);
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
