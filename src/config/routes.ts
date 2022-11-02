import { lazy } from 'react';

const routes = [
  {
    path: 'home',
    component: lazy(() => import('screens/Home')),
    exact: true
  },
  {
    path: 'books/:id',
    component: lazy(() => import('screens/Book')),
    exact: true
  }
];

export default routes;
