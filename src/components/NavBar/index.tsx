import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';
import { logoutSession } from 'services/UserService';

import logo from 'assets/logo-wolox-original.png';

function NavBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const logout = () => {
    logoutSession();
    navigate('/');
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
