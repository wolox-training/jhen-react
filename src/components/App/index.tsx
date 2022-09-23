import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import 'scss/application.scss';

import Layout from 'screens/Layout';
import NotFound from 'components/NotFound';
import PublicRoute from 'components/PublicRoute';
import PrivateRoute from 'components/PrivateRoute';
import ProtectedRoutes from 'components/ProtectedRoutes';
import Loading from 'components/Spinner/components/loading';

const SignUp = lazy(() => import('screens/SignUp'));
const Login = lazy(() => import('screens/Login'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Switch>
          <PublicRoute path="/" exact>
            <Login />
          </PublicRoute>
          <PublicRoute path="/sign_up">
            <SignUp />
          </PublicRoute>
          <PrivateRoute path="/">
            <ProtectedRoutes />
          </PrivateRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
