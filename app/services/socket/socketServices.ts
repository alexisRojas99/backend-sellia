import jwt from 'jsonwebtoken';
import { Server as IO, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import ChatServices from './chatServices';

const chatService = new ChatServices();

const join = (roomId: string) => (socket: any) => {
  socket.join(roomId);
};

const leave = (roomId: string) => (socket: any) => {
  socket.leave(roomId);
};

export default class SocketServices {
  static socketController(socket: Socket<DefaultEventsMap, any>, io?: IO) {
    const token = socket.handshake.auth?.token;

    const { user } = jwt.verify(token, process.env.SECRET_KEY_JWT as string) as any;

    join(socket.handshake.headers.room as string)(socket);

    socket.on('join-room', (data: any) => {
      chatService.onlineUsers(data);
      io?.emit('join-room', chatService.onlineUsersArr);

      // console.log(chatService.onlineUsersArr.filter((room: any) => room.roomId === data.roomId));
    });

    // socket.on('send-message', (data) => {
    //   console.log('send-message', data);
    //   socket.to(data.roomId).emit('new-message', data);
    // });

    socket.on('disconnect', async () => {
      leave(socket.handshake.headers.room as string)(socket);
      chatService.disconnectUsers(user?.id);
      io?.emit('join-room', chatService.onlineUsersArr);
    });
  }
}
