import { Request, Response } from 'express';
import { RoomServicesInterfaces } from '../services/interfaces/RoomServicesInterfaces';
import { HttpCode } from '../../configs/HttpCode';

export default class RoomController {
  constructor(private readonly roomServices: RoomServicesInterfaces) {}

  public async index(req: Request, res: Response) {
    const response = await this.roomServices.index();

    return res.status(HttpCode.HTTP_OK).json(response);
  }

  public async getRoomById(req: Request, res: Response) {
    const { id } = req.params;

    const response = await this.roomServices.getRoomById(id);

    return res.status(HttpCode.HTTP_OK).json(response);
  }

  public async createRoom(req: Request, res: Response) {
    const { name, description, status } = req.body;

    const response = await this.roomServices.createRoom({ name, description, status });

    return res.status(HttpCode.HTTP_CREATED).json(response);
  }
}
