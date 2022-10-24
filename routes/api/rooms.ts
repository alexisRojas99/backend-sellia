import { Router } from 'express';
import RoomController from '../../app/controllers/RoomControllers';
import RoomServices from '../../app/services/RoomServices';
import Call from '../../app/utils/Call';

const router = Router();
const roomController = new RoomController(new RoomServices());

router.get('/', [], Call(roomController.index.bind(roomController)));
router.get('/:id', [], Call(roomController.getRoomById.bind(roomController)));
router.post('/', [], Call(roomController.createRoom.bind(roomController)));

export default router;
