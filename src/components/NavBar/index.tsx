import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';
import { logoutSession } from 'services/UserService';

import logo from 'assets/logo-wolox-original.png';

function NavBar() {
  const navigate = useNavigate();

  const logout = () => {
    logoutSession();
    navigate('/');
  };

  return (
    <div className={styles.navbar}>
      <nav className={styles.nav}>
        <img src={logo} className={styles.logo} alt="Logo original de wolox" />
        <button className={styles.logout} onClick={logout}>
          Logout
        </button>
      </nav>
    </div>
  );
}

export default NavBar;
