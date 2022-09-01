import { setupServer } from 'msw/node';

import { handlers } from './signup.handlers';
import { loginHandlers } from './login.handlers';

export const mswServer = setupServer(...handlers, ...loginHandlers);
