import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import logo from 'assets/logo-wolox-original.png';
import { logoutSession } from 'services/UserService';

import styles from './styles.module.scss';

function NavBar() {
  const { t } = useTranslation();
  const history = useHistory();

  const logout = () => {
    logoutSession();
    history.push('/');
  };

  return (
    <nav className={styles.nav}>
      <img src={logo} className={styles.logo} alt={t('Nav:logoAlt')} />
      <button className={styles.logout} onClick={logout}>
        {t('Nav:logout')}
      </button>
    </nav>
  );
}

export default NavBar;
