import React from 'react';
import { Toaster } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

import Language from 'components/Language';

import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className={styles.layout}>
      <Toaster position="top-right" />
      {/* Future Header */}
      <div className={styles.container}>{children}</div>
      <Language />
      {/* Future footer */}
    </div>
  );
}

export default Layout;
