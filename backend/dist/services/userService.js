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
exports.UserService = void 0;
const server_1 = require("../server");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserService {
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the email already exists
                const existingUser = yield server_1.prisma.user.findUnique({
                    where: { email: data.email },
                });
                if (existingUser) {
                    throw new Error('Email already exists');
                }
                // Hash the password before storing it
                const hashedPassword = yield bcryptjs_1.default.hash(data.password, 10);
                const newUser = yield server_1.prisma.user.create({
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
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to create user: ${error.message}`);
                }
                else {
                    throw new Error('Failed to create user: Unknown error');
                }
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield server_1.prisma.user.findMany();
                return users;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch users: ${error.message}`);
                }
                else {
                    throw new Error('Failed to fetch users: Unknown error');
                }
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield server_1.prisma.user.findUnique({
                    where: { id },
                });
                return user;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch user by ID: ${error.message}`);
                }
                else {
                    throw new Error('Failed to fetch user by ID: Unknown error');
                }
            }
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Hash the password if it is being updated
                if (data.password) {
                    data.password = yield bcryptjs_1.default.hash(data.password, 10);
                }
                const updatedUser = yield server_1.prisma.user.update({
                    where: { id },
                    data,
                });
                return updatedUser;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to update user: ${error.message}`);
                }
                else {
                    throw new Error('Failed to update user: Unknown error');
                }
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield server_1.prisma.user.delete({
                    where: { id },
                });
                return deletedUser;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to delete user: ${error.message}`);
                }
                else {
                    throw new Error('Failed to delete user: Unknown error');
                }
            }
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield server_1.prisma.user.findMany({
                    where: {
                        isAdmin: false,
                        isManager: false,
                    },
                });
                return users;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch users: ${error.message}`);
                }
                else {
                    throw new Error('Failed to fetch users: Unknown error');
                }
            }
        });
    }
    getAdmins() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admins = yield server_1.prisma.user.findMany({
                    where: {
                        isAdmin: true,
                    },
                });
                return admins;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch admins: ${error.message}`);
                }
                else {
                    throw new Error('Failed to fetch admins: Unknown error');
                }
            }
        });
    }
    getManagers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const managers = yield server_1.prisma.user.findMany({
                    where: {
                        isManager: true,
                    },
                });
                return managers;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch managers: ${error.message}`);
                }
                else {
                    throw new Error('Failed to fetch managers: Unknown error');
                }
            }
        });
    }
}
exports.UserService = UserService;
