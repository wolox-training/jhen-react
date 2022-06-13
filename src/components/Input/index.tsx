import React, { InputHTMLAttributes } from 'react';

import styles from './styles.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errors?: any;
  label: string;
  name: string;
  register: any;
  rules?: any;
  type?: 'text' | 'email' | 'number' | 'password';
}

function Input({ errors = {}, label, name, register, rules = {}, type = 'text', ...rest }: Props) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        name={name}
        className={[styles.input, errors[name] ? styles.inputError : ''].join(' ')}
        ref={register && register(rules)}
        {...rest}
      />
      {errors[name] && <p className={styles.error}>{errors[name].message}</p>}
    </div>
  );
}

export default Input;
