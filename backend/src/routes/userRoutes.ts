import express from 'express';
import { UserController } from '../controller/userController';

const router = express.Router();
const userController = new UserController();

router.post('/', userController.createUser.bind(userController));
router.get('/', userController.getAllUsers.bind(userController));
router.get('/:id', userController.getUserById.bind(userController));
router.put('/:id', userController.updateUser.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));

// New routes for fetching users, admins, and managers
router.get('/role/users', userController.getUsers.bind(userController));
router.get('/role/admins', userController.getAdmins.bind(userController));
router.get('/role/managers', userController.getManagers.bind(userController));

export default router;
