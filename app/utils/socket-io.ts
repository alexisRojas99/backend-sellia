import { Server as ServerHTTP } from 'http';
import { ExtendedError } from 'socket.io/dist/namespace';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Server as IO, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import Server from '../../configs/server/Server';
import Users from '../models/Users';

let instance: IO;

class WS {
  // private server: ServerHTTP;

  constructor(private server?: ServerHTTP) {
    this.server = server || Server?.server;

    if (!instance) {
      instance = new IO(this.server, {
        cors: {
          origin: 'http://localhost:3000',
          methods: ['GET', 'POST'],
        },
        // transports: ['websocket', 'polling'],
      });
    }
    this.valid();
    // eslint-disable-next-line no-constructor-return
    return instance as any;
  }

  // eslint-disable-next-line class-methods-use-this
  valid() {
    instance.use(async (socket: Socket<DefaultEventsMap, any>, next: (err?: ExtendedError | undefined | any) => void) => {
      try {
        const { token } = socket.handshake.auth;

        if (!token) socket.disconnect();
        const { user } = jwt.verify(token, process.env.SECRET_KEY_JWT as string) as any;

        const usuario = await Users.findById(user?.id);

        if (usuario) {
          next();
        } else {
          const err = new Error('Not Authorized') as any;
          err.data = { content: 'Intente mas tarde' };
          next(err);
        }
      } catch (e) {
        next(e);
      }
    });
  }
}

export default WS as Socket<DefaultEventsMap, any> | any;
