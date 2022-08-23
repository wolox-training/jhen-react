import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Container from 'components/Container';
import buttonStyles from '../../components/Button/styles.module.scss';

function Login() {
  const { t, i18n } = useTranslation();

  return (
    <Container>
      <Link to="/sign_up" className={[buttonStyles.button, buttonStyles.small, buttonStyles.center].join(' ')}>
        {t('Login:lblSignUp')}
      </Link>
    </Container>
  );
}

export default Login;
