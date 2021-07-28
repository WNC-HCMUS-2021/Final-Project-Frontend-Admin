import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/index'));

const ListCategory = React.lazy(() => import('./views/category/index'));
const CreateCategory = React.lazy(() => import('./views/category/create'));

const ListAcademy = React.lazy(() => import('./views/academy/index'));
const CreateAcademy = React.lazy(() => import('./views/academy/create'));
const DetailAcademy = React.lazy(() => import('./views/academy/detail'));
const EditAcademy = React.lazy(() => import('./views/academy/edit'));

const ListTeacher = React.lazy(() => import('./views/teacher/index'));
const CreateTeacher = React.lazy(() => import('./views/teacher/create'));
const ListAcademyTeacher = React.lazy(() => import('./views/teacher/list-academy'));

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
  { path: '/teachers/academy', exact: true, name: 'Academy of teacher', component: ListAcademyTeacher },
  { path: '/teachers/academy/detail/:id', exact: true, name: 'Detail', component: DetailAcademy },
  { path: '/teachers/academy/edit/:id', exact: true, name: 'Edit', component: EditAcademy },

  { path: '/students', exact: true, name: 'Student', component: ListStudent },
];

export default routes;
