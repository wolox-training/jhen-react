import { lazy } from 'react';

const routes = [
  {
    path: 'home',
    component: lazy(() => import('screens/Home')),
    exact: true
  }
];

export default routes;
