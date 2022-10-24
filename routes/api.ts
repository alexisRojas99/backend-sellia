import { Router } from 'express';
import MainControllers from '../app/controllers/mainControllers';
import MainServices from '../app/services/auth/MainServices';
import Call from '../app/utils/Call';
import auth from '../app/middlewares/validate-jwt';
import routesUsers from './api/users';
import routesRooms from './api/rooms';
import routesMessages from './api/messages';

const router = Router();
const mainControllers = new MainControllers(new MainServices());
router.post('/v1/login', [], Call(mainControllers.login.bind(mainControllers)));
router.get('/v1/auth', [auth], Call(mainControllers.authToken.bind(mainControllers)));
router.use('/v1/users', [], routesUsers);
router.use('/v1/rooms', [auth], routesRooms);
router.use('/v1/messages', [auth], routesMessages);

export default router;
