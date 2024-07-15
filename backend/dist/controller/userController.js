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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
const emailService_1 = require("../utils/emailService");
class UserController {
    constructor() {
        this.userService = new userService_1.UserService();
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, name, phoneNumber, image, isAdmin, isManager } = req.body;
            try {
                const user = yield this.userService.createUser({
                    email,
                    password,
                    name,
                    phoneNumber,
                    image,
                    isAdmin,
                    isManager,
                });
                // Send registration email
                yield (0, emailService_1.sendRegistrationEmail)({ email, name: name || 'User' });
                res.status(201).json(user);
            }
            catch (error) {
                console.error('Error creating user:', error);
                res.status(500).json({ error: 'Failed to create user' });
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getAllUsers();
                res.json(users);
            }
            catch (error) {
                console.error('Error fetching users:', error);
                res.status(500).json({ error: 'Failed to fetch users' });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                const user = yield this.userService.getUserById(userId);
                if (!user) {
                    res.status(404).json({ error: 'User not found' });
                }
                else {
                    res.json(user);
                }
            }
            catch (error) {
                console.error('Error fetching user by id:', error);
                res.status(500).json({ error: 'Failed to fetch user' });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const { email, password, name, phoneNumber, image, isAdmin, isManager } = req.body;
            try {
                const updatedUser = yield this.userService.updateUser(userId, {
                    email,
                    password,
                    name,
                    phoneNumber,
                    image,
                    isAdmin,
                    isManager,
                });
                res.json(updatedUser);
            }
            catch (error) {
                console.error('Error updating user:', error);
                res.status(500).json({ error: 'Failed to update user' });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                yield this.userService.deleteUser(userId);
                res.json({ message: 'User deleted successfully' });
            }
            catch (error) {
                console.error('Error deleting user:', error);
                res.status(500).json({ error: 'Failed to delete user' });
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getUsers();
                res.json(users);
            }
            catch (error) {
                console.error('Error fetching users:', error);
                res.status(500).json({ error: 'Failed to fetch users' });
            }
        });
    }
    getAdmins(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admins = yield this.userService.getAdmins();
                res.json(admins);
            }
            catch (error) {
                console.error('Error fetching admins:', error);
                res.status(500).json({ error: 'Failed to fetch admins' });
            }
        });
    }
    getManagers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const managers = yield this.userService.getManagers();
                res.json(managers);
            }
            catch (error) {
                console.error('Error fetching managers:', error);
                res.status(500).json({ error: 'Failed to fetch managers' });
            }
        });
    }
}
exports.UserController = UserController;
