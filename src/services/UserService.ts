import { ApiResponse } from 'apisauce';

import api from 'config/api';
import { User } from 'types/user';
import { objectCamelToSnake } from 'utils/case';

export async function signUp(user: User): Promise<ApiResponse<any>> {
  const response = await api.post('/users', objectCamelToSnake(user));
  return response;
}
