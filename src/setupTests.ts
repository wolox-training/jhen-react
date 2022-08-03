import '@testing-library/jest-dom';
import 'mutationobserver-shim';

import { mswServer } from './mocks/msw-server';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

jest.mock('i18next', () => ({
  t: (key: string, params: Record<string, string>) => (params ? `${key} ${JSON.stringify(params)}` : key)
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key })
}));
