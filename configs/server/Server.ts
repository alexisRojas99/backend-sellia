/* eslint-disable lines-between-class-members */
import express, { Application } from 'express';
import { Server as IO, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { createServer, Server as ServerHTTP } from 'http';
import cors from 'cors';
import router from '../../routes/api';
import Handler from '../../handlers/Handler';
import mongoDB from '../../app/database/mongoDB/connection';
import SocketServices from '../../app/services/socket/socketServices';
import WS from '../../app/utils/socket-io';

class Server {
  app: Application;
  port: string;
  server: ServerHTTP;
  host: string;
  path: string;
  io: IO;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || process.env.APP_PORT || '8000';
    this.server = createServer(this.app);
    this.host = process.env.APP_HOST || 'localhost';
    this.path = '/api';

    this.io = new WS(this.server) as any;

    mongoDB.connection();

    // Lectura y Parseo del body
    this.app.use(express.json());

    // Middleware
    this.middleWares();

    // Ejecuta el metodo de las rutas
    this.routes();

    // Configuracion de las excepciones
    this.ExceptionConfig();

    // Socket
    this.sockets();
  }

  middleWares() {
    // CORS
    this.app.use(cors());

    // Directorio publico
    this.app.use(express.static('public'));

    // OpenAPI Documentation
  }

  routes() {
    this.app.use(this.path, router);
  }

  ExceptionConfig() {
    this.app.use(Handler.handlerErrorMiddleware);
    this.app.use(Handler.handleError);
  }

  sockets() {
    this.io.on('connection', (socket: Socket<DefaultEventsMap, any>) => SocketServices.socketController(socket, this.io));
  }

  listen() {
    this.server.listen(this.port, parseInt(this.host, 10), () => {
      // eslint-disable-next-line no-console
      console.log(`API-REST listening at http://${this.host}:${this.port}`);
    });
  }
}

export default new Server();
