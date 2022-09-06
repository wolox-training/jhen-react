import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

import Container from 'components/Container';
import Input from 'components/Input';
import Button from 'components/Button';
import { MAX_PASSWORD, MIN_PASSWORD } from 'constants/constants';
import { User } from 'types/user';
import Messages from 'components/Messages';

import buttonStyles from '../../components/Button/styles.module.scss';
import { signUp } from '../../services/UserService';

import styles from './styles.module.scss';

function SignUp() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

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
      .email(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    password: Yup.string()
      .required()
      .min(minPassword)
      .max(maxPassword),
    passwordConfirmation: Yup.string()
      .required()
      .oneOf([Yup.ref('password'), null])
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

  const { mutate, isLoading, isSuccess, isError, error } = useMutation((user: User) => signUp(user), {
    onSuccess: () => {
      navigate('/');
    },
    onError: (err: any) => {
      if (!err?.errors) {
        toast.error(t('Services:genericError'));
      }
    }
  });

  const onSubmit = (user: User) => {
    user.locale = i18n?.language;
    mutate(user);
  };

  return (
    <Container>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input name="firstName" label={t('SignUp:lblName')} register={register} errors={errors} />
        <Input name="lastName" label={t('SignUp:lblLastName')} register={register} errors={errors} />
        <Input name="email" label={t('SignUp:lblEmail')} register={register} errors={errors} />
        <Input
          type="password"
          name="password"
          label={t('SignUp:lblPassword')}
          register={register}
          errors={errors}
        />
        <Input
          type="password"
          name="passwordConfirmation"
          label={t('SignUp:lblPasswordConfirm')}
          register={register}
          errors={errors}
        />
        <Button type="submit" label={t('SignUp:lblSignUp')} loading={isLoading} primary />
      </form>
      <Link to="/" className={[buttonStyles.button, buttonStyles.small, buttonStyles.center].join(' ')}>
        {t('SignUp:lblLogin')}
      </Link>
      {isError && error?.errors && <Messages type="error" messages={error.errors.full_messages} />}
      {isSuccess && <Messages type="success" messages={[t('SignUp:successMessage')]} />}
    </Container>
  );
}

export default SignUp;
