import { setupServer } from 'msw/node';

import { handlers } from './signup.handlers';

export const mswServer = setupServer(...handlers);
