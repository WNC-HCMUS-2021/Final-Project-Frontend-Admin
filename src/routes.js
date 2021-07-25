import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/index'));

const ListCategory = React.lazy(() => import('./views/category/index'));
const CreateCategory = React.lazy(() => import('./views/category/create'));

// const ListAcademy = React.lazy(() => import('./views/academy/index'));
// const CreateAcademy = React.lazy(() => import('./views/academy/create'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  
  { path: '/categories', exact: true, name: 'Category', component: ListCategory },
  { path: '/categories/create', name: 'Add', component: CreateCategory },
];

export default routes;
