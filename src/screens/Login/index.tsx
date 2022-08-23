import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Container from 'components/Container';
import Button from 'components/Button';

function Login() {
  const { t, i18n } = useTranslation();

  return (
    <Container>
      <Link to="/sign_up">
        <Button label={t('Login:lblSignUp')} loading={false} />
      </Link>
    </Container>
  );
}

export default Login;
