import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from 'components/App';
import 'config/i18n';
import 'config/yup';
import 'scss/application.scss';

import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient();

try {
  if (typeof window === 'undefined') {
    const { server } = require('./mocks/msw-server');
    server.listen();
  }
} catch (e) {
  throw e;
}

const renderApp = () => {
  render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

// Render once
renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
