import bcrypt from 'bcryptjs';
import Login from '../types/Login';
import Token from '../types/Token';
import jwtUtil from '../utils/JWT';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';

async function verifyLogin(login: Login): Promise<ServiceResponse<Token>> {
  if (!login.username || !login.password) {
    return { status: 'INVALID_DATA', data: { message: '"username" and "password" are required' } };
  }
  
  const user = await UserModel.findOne({ where: { username: login.username } });

  if (!user || !bcrypt.compareSync(login.password, user.dataValues.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const { id, username } = user.dataValues;
  const token = jwtUtil.sign({ id, username });
  
  return { status: 'SUCCESSFUL', data: { token } };
}

export default {
  verifyLogin,
};