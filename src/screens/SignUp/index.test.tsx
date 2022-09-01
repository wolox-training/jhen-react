import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import { SignUpHandlerException } from 'mocks/signup.handlers';

import { mswServer } from '../../mocks/msw-server';

import SignUp from './index';

const queryClient = new QueryClient();

test('render sign up label', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <SignUp />
    </QueryClientProvider>
  , { wrapper: MemoryRouter });

  const linkElement = await screen.findByText('SignUp:lblSignUp');

  expect(linkElement).toBeInTheDocument();
});

test('render required label when a required input is empty', async () => {
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <SignUp />
    </QueryClientProvider>
  , { wrapper: MemoryRouter });
  const inputFirstName = container.getElementsByTagName('input')[0];
  const inputLastName = container.getElementsByTagName('input')[1];
  const inputEmail = container.getElementsByTagName('input')[2];
  const inputPassword = container.getElementsByTagName('input')[3];
  const inputPasswordConfirmation = container.getElementsByTagName('input')[4];

  inputFirstName.focus();
  userEvent.tab();
  inputLastName.focus();
  userEvent.tab();
  inputEmail.focus();
  userEvent.tab();
  inputPassword.focus();
  userEvent.tab();
  inputPasswordConfirmation.focus();
  userEvent.tab();

  const firstNameRequired = await screen.findByText('firstName is a required field');
  const lastNameRequired = await screen.findByText('firstName is a required field');
  const emailRequired = await screen.findByText('email is a required field');
  const passwordRequired = await screen.findByText('password is a required field');
  const passwordConfirmationRequired = await screen.findByText('passwordConfirmation is a required field');

  expect(firstNameRequired).toBeInTheDocument();
  expect(lastNameRequired).toBeInTheDocument();
  expect(emailRequired).toBeInTheDocument();
  expect(passwordRequired).toBeInTheDocument();
  expect(passwordConfirmationRequired).toBeInTheDocument();
});

test('render malformed label when the email input is malformed', async () => {
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <SignUp />
    </QueryClientProvider>
  , { wrapper: MemoryRouter });

  const inputEmail = container.getElementsByTagName('input')[2];

  fireEvent.change(inputEmail, { target: { value: 'julian@' } });
  inputEmail.focus();
  userEvent.tab();

  const emailMalformed = await screen.findByText('email must be a valid email');

  expect(emailMalformed).toBeInTheDocument();
});

test('render minimum length label when the password input is short', async () => {
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <SignUp />
    </QueryClientProvider>
  , { wrapper: MemoryRouter });

  const inputPassword = container.getElementsByTagName('input')[3];

  fireEvent.change(inputPassword, { target: { value: '123456' } });
  inputPassword.focus();
  userEvent.tab();

  const firstNameRequired = await screen.findByText('password must be at least 8 characters');

  expect(firstNameRequired).toBeInTheDocument();
});

test('render maximum length label when the password input is long', async () => {
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <SignUp />
    </QueryClientProvider>
  , { wrapper: MemoryRouter });
  const inputPassword = container.getElementsByTagName('input')[3];

  fireEvent.change(inputPassword, { target: { value: '1234567890123456789' } });
  inputPassword.focus();
  userEvent.tab();

  const firstNameRequired = await screen.findByText('password must be at most 16 characters');

  expect(firstNameRequired).toBeInTheDocument();
});

test('render password confirm label when the password confirmation is wrong', async () => {
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <SignUp />
    </QueryClientProvider>
  , { wrapper: MemoryRouter });
  const inputPassword = container.getElementsByTagName('input')[3];
  const inputPasswordConfirmation = container.getElementsByTagName('input')[4];

  fireEvent.change(inputPassword, { target: { value: '987654321' } });
  inputPassword.focus();
  userEvent.tab();
  fireEvent.change(inputPasswordConfirmation, { target: { value: '123456789' } });
  inputPasswordConfirmation.focus();
  userEvent.tab();

  const firstNameRequired = await screen.findByText('passwordConfirmation must be one of the following values: , Ref(password)');

  expect(firstNameRequired).toBeInTheDocument();
});

test('do not submit the form if the required fields are empty', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <SignUp />
    </QueryClientProvider>
  , { wrapper: MemoryRouter });
  const mockCallBack = jest.fn();

  fireEvent.click(screen.getByText('SignUp:lblSignUp'));

  const firstNameRequired = await screen.findByText('firstName is a required field');
  const lastNameRequired = await screen.findByText('firstName is a required field');
  const emailRequired = await screen.findByText('email is a required field');
  const passwordRequired = await screen.findByText('password is a required field');
  const passwordConfirmationRequired = await screen.findByText('passwordConfirmation is a required field');

  expect(firstNameRequired).toBeInTheDocument();
  expect(lastNameRequired).toBeInTheDocument();
  expect(emailRequired).toBeInTheDocument();
  expect(passwordRequired).toBeInTheDocument();
  expect(passwordConfirmationRequired).toBeInTheDocument();
  expect(mockCallBack.mock.calls.length).toEqual(0);
});

test('submit the form and create the user', async () => {
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <SignUp />
    </QueryClientProvider>
  , { wrapper: MemoryRouter });
  const inputFirstName = container.getElementsByTagName('input')[0];
  const inputLastName = container.getElementsByTagName('input')[1];
  const inputEmail = container.getElementsByTagName('input')[2];
  const inputPassword = container.getElementsByTagName('input')[3];
  const inputPasswordConfirmation = container.getElementsByTagName('input')[4];

  fireEvent.change(inputFirstName, { target: { value: 'Prueba' } });
  fireEvent.change(inputLastName, { target: { value: 'Prueba' } });
  fireEvent.change(inputEmail, { target: { value: 'julian@prueba.com' } });
  fireEvent.change(inputPassword, { target: { value: '123456789' } });
  fireEvent.change(inputPasswordConfirmation, { target: { value: '123456789' } });

  fireEvent.click(screen.getByText('SignUp:lblSignUp'));

  const result = await screen.findByText('SignUp:successMessage');
  expect(result).toBeInTheDocument();
});

test('submit the form and generate an error with the email', async () => {
  mswServer.use(SignUpHandlerException);

  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <SignUp />
    </QueryClientProvider>
  , { wrapper: MemoryRouter });
  const inputFirstName = container.getElementsByTagName('input')[0];
  const inputLastName = container.getElementsByTagName('input')[1];
  const inputEmail = container.getElementsByTagName('input')[2];
  const inputPassword = container.getElementsByTagName('input')[3];
  const inputPasswordConfirmation = container.getElementsByTagName('input')[4];

  fireEvent.change(inputFirstName, { target: { value: 'Prueba' } });
  fireEvent.change(inputLastName, { target: { value: 'Prueba' } });
  fireEvent.change(inputEmail, { target: { value: 'julian@prueba.com' } });
  fireEvent.change(inputPassword, { target: { value: '123456789' } });
  fireEvent.change(inputPasswordConfirmation, { target: { value: '123456789' } });

  fireEvent.click(screen.getByText('SignUp:lblSignUp'));

  const result = await screen.findByText('Email has already been taken');
  expect(result).toBeInTheDocument();
});
