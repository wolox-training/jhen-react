import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import logo from 'assets/book-cover.png';
import { getBooks } from 'services/BookService';

import styles from './styles.module.scss';
import Loading from 'components/Spinner/components/loading';

function BookList() {
  const { t } = useTranslation();
  const { isLoading, isError, isSuccess, error, data }: any = useQuery(['books'], () => getBooks());

  return (
    <div className={styles.list}>
      {isLoading && <Loading />}
      {isSuccess && data.page.map(({ id, title, author }: any) => (
        <div className={styles.book} key={id}>
          <img src={logo} className={styles.cover} alt={t('BookList:logoAlt')} />
          <p className={styles.title}>{title}</p>
          <span className={styles.author}>{author}</span>
        </div>
      ))}
      {isError && <p>{error}</p>}
    </div>
  );
}

export default BookList;
