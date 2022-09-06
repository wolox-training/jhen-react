import { setupWorker } from 'msw';

import { handlers } from './signup.handlers';
import { loginHandlers } from './login.handlers';

export const mswWorker = setupWorker(...handlers, ...loginHandlers);
