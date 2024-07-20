import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const jwtSecret = 'pass'; // Replace with your actual secret

// Define a new interface extending Request to include user property
interface AuthenticatedRequest extends Request {
  user?: { userId: string, email: string, name: string }; // Define the structure of the user property
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  // Get token from headers
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is missing' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret) as { userId: string, email: string, name: string };

    // Attach decoded user info to request object
    req.user = { userId: decoded.userId, email: decoded.email, name: decoded.name };

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
