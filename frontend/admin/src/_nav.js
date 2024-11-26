import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilBriefcase,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPlus,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'AwashInsurance',
    },
  },
  {
    component: CNavTitle,
    name: 'View Vacancy',
  },
  {
    component: CNavItem,
    name: 'Active-vacancy',
    to: '/theme/colors',
    icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Completed Vacancy',
    to: '/theme/typography',
    icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'New Vacancy',
  },
  {
    component: CNavGroup,
    name: 'Create New',
    to: '/base',
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Internal Vacancy',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'External Vacancy',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'FreshGraduate Vacancy',
        to: '/base/cards',
      },
    ],
  },

  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Record List',
        to: '/pages/recordlist',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/pages/validation',
      },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'Docs',
  //   href: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
]

export default _nav
