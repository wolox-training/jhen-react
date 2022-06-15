import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import Container from 'components/Container';
import Input from 'components/Input';
import Button from 'components/Button';
import { objectCamelToSnake } from 'utils/case';
import { MAX_PASSWORD, MIN_PASSWORD } from 'constants/constants';
import { User } from 'types/user';

import styles from './styles.module.scss';

function SignUp() {
  const { t, i18n } = useTranslation();
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
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onTouched',
    defaultValues,
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = (data: User) => {
    data.locale = i18n.language;
    console.log({ user: { ...objectCamelToSnake(data) } });
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
        <Button type="submit" label={t('SignUp:lblSignUp')} primary />
      </form>
      <Button label={t('SignUp:lblLogin')} onClick={() => reset()} />
    </Container>
  );
}

export default SignUp;
