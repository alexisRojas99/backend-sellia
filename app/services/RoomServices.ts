import BadRequestException from '../../handlers/BadRequestException';
import Rooms from '../models/Rooms';
import { RoomServicesInterfaces, RequestQueryCreateRoom } from './interfaces/RoomServicesInterfaces';

export default class RoomServices implements RoomServicesInterfaces {
  public async index(): Promise<object> {
    const rooms = await Rooms.find();

    return rooms;
  }

  public async getRoomById(id: string): Promise<object> {
    const room = await Rooms.findById(id).catch(() => {
      throw new BadRequestException('Room not found');
    });

    const response = room;

    return response || {};
  }

  public async createRoom(dataRoom: RequestQueryCreateRoom): Promise<object> {
    const data = {
      name: dataRoom.name,
      description: dataRoom.description,
      status: dataRoom.status,
    };

    const existRoom = await Rooms.findOne({ name: data.name });

    if (existRoom) throw new BadRequestException('Room already exist');

    const createRoom = await Rooms.create(data);

    const response = {
      id: createRoom.id,
      name: createRoom.name,
      description: createRoom.description,
      status: createRoom.status,
      createdAt: createRoom.createdAt,
    };

    return response;
  }
}
