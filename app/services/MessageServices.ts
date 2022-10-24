import ChatRooms from '../models/ChatRooms';
import Users from '../models/Users';
import { MessageServicesInterfaces, RequestQueryCreateMessage, RequestQuery } from './interfaces/MessageServicesInterfaces';
import WS from '../utils/socket-io';

export default class MessageService implements MessageServicesInterfaces {
  public async getAllMessages(queriesMessage: RequestQuery) {
    const chatRooms = await ChatRooms.find({ id_room: queriesMessage.id_room }).populate('user', 'id username firstname lastname');

    return chatRooms;
  }

  public async createMessage(dataMessage: RequestQueryCreateMessage) {
    const chatRoom = await ChatRooms.create(dataMessage);

    const user = (await Users.findById(chatRoom.user)) as any;

    const response = {
      id: chatRoom.id,
      idRoom: chatRoom.id_room,
      message: chatRoom.message,
      status: chatRoom.status,
      createdAt: chatRoom.createdAt,
      viewCount: chatRoom.view_counter,
      user: {
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    };

    const ws = new WS();
    ws.to(dataMessage.id_room).emit('new-message', response);

    return response;
  }
}
