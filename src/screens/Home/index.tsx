import React from 'react';
import i18next from 'i18next';

import logo from './assets/logo.svg';
import styles from './styles.module.scss';
import NavBar from 'components/NavBar';

function Home() {
  return (
    <div className={styles.home}>
      <NavBar />
    </div>
  );
}

export default Home;
