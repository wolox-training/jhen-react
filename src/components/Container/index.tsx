import React from 'react';

import logo from 'assets/logo-wolox-original.png';

import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
}

function Container({ children }: Props) {
  return (
    <div className={styles.container}>
      <img src={logo} className={styles.logo} alt="Logo original de wolox" />
      {children}
    </div>
  );
}

export default Container;
