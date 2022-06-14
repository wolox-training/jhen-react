import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Container from 'components/Container';
import Input from 'components/Input';
import Button from 'components/Button';
import { objectCamelToSnake } from 'utils/case';
import { MAX_PASSWORD, MIN_PASSWORD } from 'constants/constants';
import { REQUIRED_MESSAGE } from 'constants/messages';
import { User } from 'types/user';

import styles from './styles.module.scss';

function SignUp() {
  const requiredMessage = REQUIRED_MESSAGE;
  const minPasword = MIN_PASSWORD;
  const maxPassword = MAX_PASSWORD;
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
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit" primary label="Sign Up" />
      </form>
      <Button label="Login" onClick={() => reset()} />
    </Container>
  );
}

export default SignUp;
