import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { isAuthenticated } from 'services/UserService';

function PublicRoute({ children, ...rest }: RouteProps) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/home',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PublicRoute;
