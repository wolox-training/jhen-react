import { rest } from 'msw';

import { STATUS_CODE_DATA_ERROR, MOCK_SIGNUP, MOCK_SIGNUP_ERROR } from '../constants/constants';

const baseURL = process.env.API_BASE_URL;

const postSignUpPath = `${baseURL}/users`;

const SignUpHandler = rest.post(postSignUpPath, (req, res, ctx) => res(ctx.json(MOCK_SIGNUP)));

export const SignUpHandlerException = rest.post(postSignUpPath, (req, res, ctx) =>
  res(ctx.status(STATUS_CODE_DATA_ERROR), ctx.json(MOCK_SIGNUP_ERROR))
);

export const handlers = [SignUpHandler];
