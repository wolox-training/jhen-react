import React from 'react';
import { Route, Routes } from 'react-router-dom';

import 'scss/application.scss';

import SignUp from 'screens/SignUp/index';
import Login from 'screens/Login';
import Layout from 'screens/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="sign_up" element={<SignUp />} />
      </Routes>
    </Layout>
  );
}

export default App;
