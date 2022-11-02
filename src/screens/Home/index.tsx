import React from 'react';

import styles from './styles.module.scss';
import NavBar from 'components/NavBar';
import BookList from 'components/BookList';
import { setHeaders } from 'config/api';
import { isAuthenticated } from 'services/UserService';
import LocalStorageService from 'services/LocalStorageService';


function Home() {
  if (isAuthenticated()) {
    const session = LocalStorageService.getValue('session');
    setHeaders(session);
  }

  return (
    <div className={styles.home}>
      <NavBar />
      <BookList />
    </div>
  );
}

export default Home;
