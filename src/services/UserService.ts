import { ApiResponse } from 'apisauce';

import api from 'config/api';
import { User } from 'types/user';
import { objectCamelToSnake } from 'utils/case';

import { ServiceResponse } from './types/serviceResponse';
import { SignUpResponse } from './types/signUpResponse';
import { LoginResponse } from './types/loginResponse';
import localStorageService from './LocalStorageService';

const userPath = '/users';

function extractSession(response: ApiResponse<any, any>) {
  const { headers }: any = response;
  const { uid, client, 'access-token': accessToken } = headers;

  return { uid, client, 'access-token': accessToken };
}

export function signUp(user: User) {
  return api.post<ServiceResponse<SignUpResponse>>(userPath, objectCamelToSnake(user)).then(res => {
    if (res.ok) {
      return res;
    }

    throw res.data;
  });
}

export function login(user: User) {
  return api
    .post<ServiceResponse<LoginResponse>>(`${userPath}/sign_in`, objectCamelToSnake(user))
    .then(res => {
      if (res.ok) {
        const session = extractSession(res);
        localStorageService.setValue('session', session);
        return res;
      }

      throw res.data;
    });
}

export function logoutSession() {
  localStorageService.removeValue('session');
}

export function isAuthenticated() {
  const session = localStorageService.getValue('session');
  return !!session;
}
