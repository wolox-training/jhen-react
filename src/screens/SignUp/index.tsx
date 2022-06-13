import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Container from 'components/Container';
import Input from 'components/Input';
import Button from 'components/Button';
import { objectCamelToSnake } from 'utils/case';

import styles from './styles.module.scss';
import logo from './assets/logo-wolox-original.png';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  pasword: string;
  passwordConfirmation: string;
  [key: string]: any;
}

function SignUp() {
  const requiredMessage = 'Este campo es requerido';
  const minPasword = 8;
  const maxPassword = 16;
  const defaultValues = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirmation: ''
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(requiredMessage)
      .email('El email es inválido'),
    firstName: Yup.string().required(requiredMessage),
    lastName: Yup.string().required(requiredMessage),
    password: Yup.string()
      .required(requiredMessage)
      .min(minPasword, `La contraseña debe ser de mínimo ${minPasword} caracteres`)
      .max(maxPassword, `La contraseña debe ser de máximo ${maxPassword} caracteres`),
    passwordConfirmation: Yup.string()
      .required(requiredMessage)
      .oneOf([Yup.ref('password'), null], 'La confirmación de la contraseña no coincide')
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onTouched',
    defaultValues,
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = (data: User) => {
    data.locale = 'en';
    console.log({ user: { ...objectCamelToSnake(data) } });
  };

  return (
    <Container>
      <form className={styles.form}>
        <img src={logo} className={styles.logo} alt="Logo original de wolox" />
        <Input name="firstName" label="Nombre" register={register} errors={errors} />
        <Input name="lastName" label="Apellido" register={register} errors={errors} />
        <Input name="email" label="Email" register={register} errors={errors} />
        <Input type="password" name="password" label="Password" register={register} errors={errors} />
        <Input
          type="password"
          name="passwordConfirmation"
          label="Confirmación de Password"
          register={register}
          errors={errors}
        />
        <Button primary label="Sign Up" onClick={handleSubmit(onSubmit)} />
      </form>
      <Button label="Login" onClick={() => reset()} />
    </Container>
  );
}

export default SignUp;
