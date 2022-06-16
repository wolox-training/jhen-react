import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

function Language() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('es');

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className={styles.language}>
      <select className={styles.selectLang} onChange={handleLangChange} value={language}>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}

export default Language;
