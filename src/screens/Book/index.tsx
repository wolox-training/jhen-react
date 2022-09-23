import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getBook } from 'services/BookService';
import Loading from 'components/Spinner/components/loading';
import Messages from 'components/Messages';

import styles from './styles.module.scss';
import BookDetail from 'components/BookDetail';

interface props {
  id: string;
}

function Book() {
  const { t } = useTranslation();
  let { id }: props = useParams();
  const { isLoading, isError, isSuccess, error, data }: any = useQuery(['book'], () => getBook(id));

  return (
    <div className={styles.container}>
      <Link className={styles.back} to="/home">{t('Book:linkBack')}</Link>
      {isLoading && <Loading />}
      {isSuccess && <BookDetail {...data} />}
      {isError && error?.errors && <Messages type="error" messages={error.errors} />}
    </div>
  );
}

export default Book;
