import React from 'react'
import CIcon from '@coreui/icons-react'

export const _nav_admin =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Pages']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Category',
    route: '/Categories',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'List category',
        to: '/categories'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Create category',
        to: '/categories/create',
      }
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Academy',
    to: '/academies',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Teacher',
    route: '/teachers',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'List teacher',
        to: '/teachers'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Create teacher',
        to: '/teachers/create',
      }
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Student',
    to: '/students',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
];

export const _nav_teacher =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Pages']
  },
  
  {
    _tag: 'CSidebarNavItem',
    name: 'Create academy',
    to: '/academies/create',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'List academy of teacher',
    to: '/teachers/academy',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
];

