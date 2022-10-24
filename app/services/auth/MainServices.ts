import dayjs from 'dayjs';
import bcrypt from 'bcryptjs';
import Users from '../../models/Users';
import { Login, MainServicesInterfaces, UserToken } from '../interfaces/MainServicesInterfaces';
import RequestException from '../../../handlers/RequestException';
import { HttpCode } from '../../../configs/HttpCode';
import generateJWT from '../../utils/generate-jwt';

export default class MainServices implements MainServicesInterfaces {
  public async login(login: Login) {
    const user: any = await Users.findOne({
      username: login.username,
    });

    if (!user) throw new RequestException('Credenciales incorrectas', 'UNAUTHORIZED', HttpCode.HTTP_UNAUTHORIZED);

    if (user?.is_suspended) throw new RequestException('Usuario suspendido', 'UNAUTHORIZED', HttpCode.HTTP_UNAUTHORIZED);

    const validatePassword = await bcrypt.compare(login.password, user?.password);
    if (!validatePassword) throw new RequestException('Credenciales incorrectas', 'UNAUTHORIZED', HttpCode.HTTP_UNAUTHORIZED);

    const payload = {
      user: {
        id: user?.id,
        username: user?.username,
        firstname: user?.firstname,
        lastname: user?.lastname,
        is_suspended: user?.is_suspended,
      },
    };

    const token = await generateJWT(payload);

    await user.update({
      last_login: dayjs().format(),
    });

    return {
      token,
    };
  }

  public async authToken(user: UserToken): Promise<object> {
    const getDataUser = user;

    return getDataUser;
  }
}
