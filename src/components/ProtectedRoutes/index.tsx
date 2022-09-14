import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from 'config/routes';
import Loading from 'components/Spinner/components/loading';

function ProtectedRoutes() {
  return (
    <Switch>
      <Suspense fallback={<Loading />}>
        {routes.map(({ component: Component, path, exact }) => (
          <Route path={`/${path}`} key={path} exact={exact}>
            <Component />
          </Route>
        ))}
      </Suspense>
    </Switch>
  );
}

export default ProtectedRoutes;
