import { Request, Response } from 'express';
import { HttpCode } from '../../configs/HttpCode';
import {
  MessageServicesInterfaces, RequestParams, ResponseBody, RequestBody, RequestQuery,
} from '../services/interfaces/MessageServicesInterfaces';

export default class MessageControllers {
  constructor(private readonly messageServices: MessageServicesInterfaces) {}

  public async createMessage(req: Request, res: Response) {
    const {
      id_user: idUser, id_room: idRoom, message, status,
    } = req.body;

    const response = await this.messageServices.createMessage({
      user: idUser,
      id_room: idRoom,
      message,
      status,
    });

    return res.status(HttpCode.HTTP_CREATED).json(response);
  }

  public async getAllMessages(req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response) {
    const {
      page, per_page: perPage, id_room: idRoom, is_suspended: isSuspended,
    } = req.query;

    const response = await this.messageServices.getAllMessages({
      page, per_page: perPage, id_room: idRoom, is_suspended: isSuspended,
    });

    return res.status(HttpCode.HTTP_OK).json(response);
  }
}
