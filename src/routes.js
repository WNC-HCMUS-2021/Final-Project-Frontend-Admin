import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/index'));

const ListCategory = React.lazy(() => import('./views/category/index'));
const CreateCategory = React.lazy(() => import('./views/category/create'));

const ListAcademy = React.lazy(() => import('./views/academy/index'));
const CreateAcademy = React.lazy(() => import('./views/academy/create'));

const ListTeacher = React.lazy(() => import('./views/teacher/index'));
const CreateTeacher = React.lazy(() => import('./views/teacher/create'));

const ListStudent = React.lazy(() => import('./views/student/index'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  
  { path: '/categories', exact: true, name: 'Category', component: ListCategory },
  { path: '/categories/create', name: 'Add', component: CreateCategory },

  { path: '/academies', exact: true, name: 'Academy', component: ListAcademy },
  { path: '/academies/create', name: 'Add', component: CreateAcademy },

  { path: '/teachers', exact: true, name: 'Teacher', component: ListTeacher },
  { path: '/teachers/create', exact: true, name: 'Add', component: CreateTeacher },

  { path: '/students', exact: true, name: 'Student', component: ListStudent },
];

export default routes;
