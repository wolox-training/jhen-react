import React from 'react';

import styles from './styles.module.scss';

interface Props {
  type: 'success' | 'warning' | 'error';
  messages: string[];
}

function Messages({ type = 'success', messages }: Props) {
  return (
    <div className={styles.messagesContainer}>
      {messages.map(message => (
        <div className={styles[type]} key={message}>
          {message}
        </div>
      ))}
    </div>
  );
}

export default Messages;
