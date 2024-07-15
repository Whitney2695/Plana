import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { sendRegistrationEmail } from '../utils/emailService';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const { email, password, name, phoneNumber, image, isAdmin, isManager } = req.body;

    try {
      const user = await this.userService.createUser({
        email,
        password,
        name,
        phoneNumber,
        image,
        isAdmin,
        isManager,
      });

      // Send registration email
      await sendRegistrationEmail({ email, name: name || 'User' });

      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;

    try {
      const user = await this.userService.getUserById(userId);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(user);
      }
    } catch (error) {
      console.error('Error fetching user by id:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    const { email, password, name, phoneNumber, image, isAdmin, isManager } = req.body;

    try {
      const updatedUser = await this.userService.updateUser(userId, {
        email,
        password,
        name,
        phoneNumber,
        image,
        isAdmin,
        isManager,
      });

      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;

    try {
      await this.userService.deleteUser(userId);

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getUsers();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  async getAdmins(req: Request, res: Response): Promise<void> {
    try {
      const admins = await this.userService.getAdmins();
      res.json(admins);
    } catch (error) {
      console.error('Error fetching admins:', error);
      res.status(500).json({ error: 'Failed to fetch admins' });
    }
  }

  async getManagers(req: Request, res: Response): Promise<void> {
    try {
      const managers = await this.userService.getManagers();
      res.json(managers);
    } catch (error) {
      console.error('Error fetching managers:', error);
      res.status(500).json({ error: 'Failed to fetch managers' });
    }
  }
}
