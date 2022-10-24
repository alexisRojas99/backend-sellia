import { Router } from 'express';
import UserController from '../../app/controllers/UserControllers';
import UserServices from '../../app/services/UserServices';
import Call from '../../app/utils/Call';

const router = Router();

const userController = new UserController(new UserServices());

router.post('/', [], Call(userController.createUser.bind(userController)));

export default router;
