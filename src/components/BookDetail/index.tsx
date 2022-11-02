import React from 'react';
import { useTranslation } from 'react-i18next';

import badge from 'assets/badge.png';
import styles from './styles.module.scss';

interface Props {
  title: string;
  genre: string;
  author: string;
  editor: string;
  year: number;
  image_url: string;
}

function BookDetail({ title, genre, author, editor, year, image_url }: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles.book}>
      <div className={styles.image}>
        <img src={image_url} className={styles.cover} alt={title} />
        <img src={badge} className={styles.badge} alt={t('BookDetail:badgeAlt')} />
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <h2 className={styles.subhead}>{`(${genre})`}</h2>
        </div>
        <div className={styles.detail}>
          <p className={styles.property}>{t('BookDetail:lblAuthor')}:</p>
          <p className={styles.value}>{author}</p>
        </div>
        <div className={styles.detail}>
          <p className={styles.property}>{t('BookDetail:lblEditorial')}:</p>
          <p className={styles.value}>{editor}</p>
        </div>
        <div className={styles.detail}>
          <p className={styles.property}>{t('BookDetail:lblYear')}:</p>
          <p className={styles.value}>{year}</p>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
