import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import { LoginHandlerException } from 'mocks/login.handlers';

import { mswServer } from '../../mocks/msw-server';

import Login from './index';

const queryClient = new QueryClient();

test('render login label', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  , { wrapper: MemoryRouter });

  const linkElement = await screen.findByText('Login:lblLogin');

  expect(linkElement).toBeInTheDocument();
});

test('render required label when a required input is empty', async () => {
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  , { wrapper: MemoryRouter });
  const inputEmail = container.getElementsByTagName('input')[0];
  const inputPassword = container.getElementsByTagName('input')[1];

  inputEmail.focus();
  userEvent.tab();
  inputPassword.focus();
  userEvent.tab();

  const emailRequired = await screen.findByText('email is a required field');
  const passwordRequired = await screen.findByText('password is a required field');

  expect(emailRequired).toBeInTheDocument();
  expect(passwordRequired).toBeInTheDocument();
});

test('render malformed label when the email input is malformed', async () => {
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  , { wrapper: MemoryRouter });

  const inputEmail = container.getElementsByTagName('input')[0];

  fireEvent.change(inputEmail, { target: { value: 'julian@' } });
  inputEmail.focus();
  userEvent.tab();

  const emailMalformed = await screen.findByText('email must be a valid email');

  expect(emailMalformed).toBeInTheDocument();
});

test('render minimum length label when the password input is short', async () => {
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  , { wrapper: MemoryRouter });

  const inputPassword = container.getElementsByTagName('input')[1];

  fireEvent.change(inputPassword, { target: { value: '123456' } });
  inputPassword.focus();
  userEvent.tab();

  const firstNameRequired = await screen.findByText('password must be at least 8 characters');

  expect(firstNameRequired).toBeInTheDocument();
});

test('render maximum length label when the password input is long', async () => {
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  , { wrapper: MemoryRouter });
  const inputPassword = container.getElementsByTagName('input')[1];

  fireEvent.change(inputPassword, { target: { value: '1234567890123456789' } });
  inputPassword.focus();
  userEvent.tab();

  const firstNameRequired = await screen.findByText('password must be at most 16 characters');

  expect(firstNameRequired).toBeInTheDocument();
});

test('do not submit the form if the required fields are empty', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  , { wrapper: MemoryRouter });
  const mockCallBack = jest.fn();

  fireEvent.click(screen.getByText('Login:lblLogin'));

  const emailRequired = await screen.findByText('email is a required field');
  const passwordRequired = await screen.findByText('password is a required field');

  expect(emailRequired).toBeInTheDocument();
  expect(passwordRequired).toBeInTheDocument();
  expect(mockCallBack.mock.calls.length).toEqual(0);
});

test('submit the form and login', async () => {
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  , { wrapper: MemoryRouter });
  const inputEmail = container.getElementsByTagName('input')[0];
  const inputPassword = container.getElementsByTagName('input')[1];

  fireEvent.change(inputEmail, { target: { value: 'julian@prueba.com' } });
  fireEvent.change(inputPassword, { target: { value: '123456789' } });

  await act(async () => {
    fireEvent.click(screen.getByText('Login:lblLogin'));
  })

  const result = await screen.findByText('Login:successMessage');
  expect(result).toBeInTheDocument();
});

test('submit the form and generate an error with the credentials', async () => {
  mswServer.use(LoginHandlerException);

  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  , { wrapper: MemoryRouter });
  const inputEmail = container.getElementsByTagName('input')[0];
  const inputPassword = container.getElementsByTagName('input')[1];

  fireEvent.change(inputEmail, { target: { value: 'julian@prueba.com' } });
  fireEvent.change(inputPassword, { target: { value: '123456789' } });

  fireEvent.click(screen.getByText('Login:lblLogin'));

  const result = await screen.findByText('Invalid login credentials. Please try again.');
  expect(result).toBeInTheDocument();
});
