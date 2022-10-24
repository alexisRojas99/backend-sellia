import { Router } from 'express';
import MessageControllers from '../../app/controllers/MessageControllers';
import Call from '../../app/utils/Call';
import MessageService from '../../app/services/MessageServices';

const router = Router();
const messageController = new MessageControllers(new MessageService());

router.get('/', Call(messageController.getAllMessages.bind(messageController)));
router.post('/', [], Call(messageController.createMessage.bind(messageController)));

export default router;
