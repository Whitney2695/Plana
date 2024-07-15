"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
const userController = new userController_1.UserController();
router.post('/', userController.createUser.bind(userController));
router.get('/', userController.getAllUsers.bind(userController));
router.get('/:id', userController.getUserById.bind(userController));
router.put('/:id', userController.updateUser.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));
// New routes for fetching users, admins, and managers
router.get('/role/users', userController.getUsers.bind(userController));
router.get('/role/admins', userController.getAdmins.bind(userController));
router.get('/role/managers', userController.getManagers.bind(userController));
exports.default = router;
