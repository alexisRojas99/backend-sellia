import BadRequestException from '../../handlers/BadRequestException';
import Users from '../models/Users';
import encrypt from '../utils/encrypt';
import { UserServicesInterfaces, RequestQueryCreateUser } from './interfaces/UserServicesInterfaces';

export default class UserServices implements UserServicesInterfaces {
  public async createUser(dataUser: RequestQueryCreateUser): Promise<object> {
    const pwd = await encrypt(dataUser.password);

    const data = {
      firstname: dataUser.firstname,
      lastname: dataUser.lastname,
      username: dataUser.username,
      password: pwd,
    };

    const userExists: any = await Users.findOne({ username: dataUser.username });

    if (userExists) throw new BadRequestException('User already exists');

    const user = await Users.create(data);

    const response = {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      is_suspended: user.is_suspended,
    };

    return response;
  }
}
