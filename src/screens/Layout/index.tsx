import React from 'react';

import Language from 'components/Language';

import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className={styles.layout}>
      {/* Future Header */}
      <div className={styles.container}>{children}</div>
      <Language />
      {/* Future footer */}
    </div>
  );
}

export default Layout;
