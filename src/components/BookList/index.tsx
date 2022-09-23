import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import logo from 'assets/book-cover.png';
import { getBooks } from 'services/BookService';
import Loading from 'components/Spinner/components/loading';
import Messages from 'components/Messages';

import styles from './styles.module.scss';

function BookList() {
  const { t } = useTranslation();
  const { isLoading, isError, isSuccess, error, data }: any = useQuery(['books'], () => getBooks());

  return (
    <div className={styles.list}>
      {isLoading && <Loading />}
      {isSuccess && data.page?.map(({ id, title, author, image_url }: any) => (
        <Link to={`books/${id}`} key={id}>
          <div className={styles.book}>
            <img src={image_url} className={styles.cover} alt={t('BookList:logoAlt')} />
            <p className={styles.title}>{title}</p>
            <span className={styles.author}>{author}</span>
          </div>
        </Link>
      ))}
      {isError && error?.errors && <Messages type="error" messages={error.errors} />}
    </div>
  );
}

export default BookList;
