import { prisma } from '../server';
import bcrypt from 'bcryptjs';

export class UserService {
  async createUser(data: {
    email: string;
    password: string;
    name?: string;
    phoneNumber?: string;
    image?: string;
    isAdmin?: boolean;
    isManager?: boolean;
  }) {
    try {
      // Check if the email already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new Error('Email already exists');
      }

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const newUser = await prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          name: data.name,
          phoneNumber: data.phoneNumber,
          image: data.image,
          isAdmin: data.isAdmin || false,
          isManager: data.isManager || false,
        },
      });

      return newUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create user: ${error.message}`);
      } else {
        throw new Error('Failed to create user: Unknown error');
      }
    }
  }

  async getAllUsers() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
      } else {
        throw new Error('Failed to fetch users: Unknown error');
      }
    }
  }

  async getUserById(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch user by ID: ${error.message}`);
      } else {
        throw new Error('Failed to fetch user by ID: Unknown error');
      }
    }
  }

  async updateUser(id: string, data: {
    email?: string;
    password?: string;
    name?: string;
    phoneNumber?: string;
    image?: string;
    isAdmin?: boolean;
    isManager?: boolean;
  }) {
    try {
      // Hash the password if it is being updated
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data,
      });
      return updatedUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update user: ${error.message}`);
      } else {
        throw new Error('Failed to update user: Unknown error');
      }
    }
  }

  async deleteUser(id: string) {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id },
      });
      return deletedUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete user: ${error.message}`);
      } else {
        throw new Error('Failed to delete user: Unknown error');
      }
    }
  }

  async getUsers() {
    try {
      const users = await prisma.user.findMany({
        where: {
          isAdmin: false,
          isManager: false,
        },
      });
      return users;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
      } else {
        throw new Error('Failed to fetch users: Unknown error');
      }
    }
  }

  async getAdmins() {
    try {
      const admins = await prisma.user.findMany({
        where: {
          isAdmin: true,
        },
      });
      return admins;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch admins: ${error.message}`);
      } else {
        throw new Error('Failed to fetch admins: Unknown error');
      }
    }
  }

  async getManagers() {
    try {
      const managers = await prisma.user.findMany({
        where: {
          isManager: true,
        },
      });
      return managers;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch managers: ${error.message}`);
      } else {
        throw new Error('Failed to fetch managers: Unknown error');
      }
    }
  }
}
