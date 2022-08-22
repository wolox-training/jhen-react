import { setupWorker } from 'msw';

import { handlers } from './signup.handlers';

export const mswWorker = setupWorker(...handlers);
