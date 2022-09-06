import { rest } from 'msw';

import { STATUS_CODE_DATA_ERROR, MOCK_LOGIN, MOCK_LOGIN_ERROR } from '../constants/constants';

const baseURL = process.env.API_BASE_URL;

const postLoginPath = `${baseURL}/users/sign_in`;

const LoginHandler = rest.post(postLoginPath, (req, res, ctx) => res(ctx.json(MOCK_LOGIN)));

export const LoginHandlerException = rest.post(postLoginPath, (req, res, ctx) =>
  res(ctx.status(STATUS_CODE_DATA_ERROR), ctx.json(MOCK_LOGIN_ERROR))
);

export const loginHandlers = [LoginHandler];
