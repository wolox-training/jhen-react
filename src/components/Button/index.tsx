import React from 'react';

import styles from './styles.module.scss';

interface Props {
  label: string;
  onClick: () => void;
  primary?: boolean;
  size?: string;
}

function Button({ label, primary, size = 'small', onClick }: Props) {
  const mode = primary ? styles.primary : '';
  return (
    <button type="button" className={[styles.button, styles[size], mode].join(' ')} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
