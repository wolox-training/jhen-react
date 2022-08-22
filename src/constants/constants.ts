export const MIN_PASSWORD = 8;
export const MAX_PASSWORD = 16;
export const STATUS_CODE_DATA_ERROR = 422;
export const MOCK_SIGNUP = {
  id: 1214,
  first_name: 'Prueba',
  last_name: 'React',
  email: 'react@prueba.com',
  locale: null
};
export const MOCK_SIGNUP_ERROR = {
  status: 'error',
  data: {
    id: null,
    provider: 'email',
    uid: '',
    allow_password_change: false,
    first_name: 'Prueba',
    last_name: 'Prueba',
    email: 'prueba@prueba.com',
    created_at: null,
    updated_at: null,
    locale: null
  },
  errors: {
    email: ['has already been taken'],
    full_messages: ['Email has already been taken']
  }
};
