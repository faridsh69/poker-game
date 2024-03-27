import { createBrowserRouter } from 'react-router-dom'

import { Suspender } from 'src/components/cms/templates/Suspender'
import { ErrorPage } from 'src/components/cms/molecules/ErrorPage'
import { RoutesType } from 'src/interfaces'

const ROUTES: RoutesType = [
  {
    name: 'home',
    path: '/',
    element: <Suspender pageName='Home' />,
    errorElement: <ErrorPage />,
  },
  {
    name: 'login',
    path: '/login',
    element: <Suspender pageName='Login' guest />,
    errorElement: <ErrorPage />,
  },
  {
    name: 'register',
    path: '/register',
    element: <Suspender pageName='Register' guest />,
    errorElement: <ErrorPage />,
  },
  {
    name: 'admin',
    path: 'admin',
    element: <Suspender pageName='AdminDashboard' auth />,
    errorElement: <ErrorPage />,
    children: [
      {
        name: 'admin-list',
        path: ':model',
        element: <Suspender pageName='AdminList' auth />,
      },
      {
        name: 'admin-form',
        path: ':model/create',
        element: <Suspender pageName='AdminForm' auth />,
      },
      {
        name: 'admin-show',
        path: ':model/:id',
        element: <Suspender pageName='AdminShow' auth />,
      },
      {
        name: 'admin-edit',
        path: ':model/:id/edit',
        element: <Suspender pageName='AdminForm' auth />,
      },
      {
        name: 'admin-profile',
        path: 'profile',
        element: <Suspender pageName='AdminProfile' auth />,
      },
    ],
  },
]

export const Router = createBrowserRouter(ROUTES)
