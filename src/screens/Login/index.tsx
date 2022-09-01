import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import Container from 'components/Container';
import Input from 'components/Input';
import Button from 'components/Button';
import { MAX_PASSWORD, MIN_PASSWORD } from 'constants/constants';
import { User } from 'types/user';
import Messages from 'components/Messages';

import buttonStyles from '../../components/Button/styles.module.scss';
import { login } from '../../services/UserService';

import styles from './styles.module.scss';

function Login() {
  const { t } = useTranslation();

  const minPassword = MIN_PASSWORD;
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
      .required()
      .email()
      .matches(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/),
    password: Yup.string()
      .required()
      .min(minPassword)
      .max(maxPassword)
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onTouched',
    defaultValues,
    resolver: yupResolver(validationSchema)
  });

  const { mutate, isLoading, isSuccess, isError, error } = useMutation((user: User) => login(user), {
    onSuccess: res => {
      // Go Dashboard
      console.log(res?.headers!['access-token'], res.headers?.uid, res.headers?.client);
    },
    onError: (err: any) => {
      if (!err?.errors) {
        toast.error(t('Services:genericError'));
      }
    }
  });

  const onSubmit = (user: User) => {
    mutate(user);
  };

  return (
    <Container>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input name="email" label={t('Login:lblEmail')} register={register} errors={errors} />
        <Input
          type="password"
          name="password"
          label={t('Login:lblPassword')}
          register={register}
          errors={errors}
        />
        <Button type="submit" label={t('Login:lblLogin')} loading={isLoading} primary />
      </form>
      <Link
        to="/sign_up"
        className={[buttonStyles.button, buttonStyles.small, buttonStyles.center].join(' ')}
      >
        {t('Login:lblSignUp')}
      </Link>
      {isError && error?.errors && <Messages type="error" messages={error.errors} />}
      {isSuccess && <Messages type="success" messages={[t('Login:successMessage')]} />}
    </Container>
  );
}

export default Login;
