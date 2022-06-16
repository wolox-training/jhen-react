import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';
import { ErrorMessageProps } from './types/errorMessageProps';

function ErrorMessage({ error }: ErrorMessageProps) {
  const { t } = useTranslation();

  if (error === undefined) {
    return null;
  } else if (typeof error === 'string') {
    return <div className={styles.error}>{error}</div>;
  }
  const { key, values } = error;
  return <div className={styles.error}>{t(key, values)}</div>;
}

export default ErrorMessage;
