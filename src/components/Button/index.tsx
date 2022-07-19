import React from 'react';

import { withSpinner } from 'components/Spinner/index';
import { ButtonType } from 'types/buttonType';

import styles from './styles.module.scss';

interface Props {
  label: string;
  onClick?: () => void;
  primary?: boolean;
  size?: string;
  type?: ButtonType;
}

function Button({ label, onClick, primary, size = 'small', type }: Props) {
  const mode = primary ? styles.primary : '';
  const button = type ? type : 'button';
  return (
    <button type={button} className={[styles.button, styles[size], mode].join(' ')} onClick={onClick}>
      {label}
    </button>
  );
}

export default withSpinner({ classNameContainer: `${styles.center}` })(Button);
