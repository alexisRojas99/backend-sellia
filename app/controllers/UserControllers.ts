import { Request, Response } from 'express';
import { UserServicesInterfaces } from '../services/interfaces/UserServicesInterfaces';
import { HttpCode } from '../../configs/HttpCode';

export default class UserController {
  constructor(private readonly userServices: UserServicesInterfaces) {}

  public async createUser(req: Request, res: Response) {
    const {
      firstname, lastname, username, password,
    } = req.body;

    const response = await this.userServices.createUser({
      firstname, lastname, username, password,
    });

    return res.status(HttpCode.HTTP_CREATED).json(response);
  }
}
