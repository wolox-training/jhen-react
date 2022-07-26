import api from 'config/api';
import { User } from 'types/user';
import { objectCamelToSnake } from 'utils/case';

import { ServiceResponse } from './types/serviceResponse';
import { SignUpResponse } from './types/signUpResponse';

export function signUp(user: User) {
  return api.post<ServiceResponse<SignUpResponse>>('/users', objectCamelToSnake(user)).then(res => {
    if (res.ok) {
      return res;
    }

    throw res.data;
  });
}
