import { createBrowserRouter } from 'react-router-dom'

import { ErrorPage } from 'src/components/cms/molecules/ErrorPage'
import { Suspender } from 'src/components/cms/templates/Suspender'
import { RoutesType } from 'src/interfaces'

const ROUTES: RoutesType = [
  {
    name: 'home',
    path: '/',
    element: <Suspender pageName='Home' />,
    errorElement: <ErrorPage />,
  },
  {
    name: 'test',
    path: '/test',
    element: <Suspender pageName='Test' />,
    errorElement: <ErrorPage />,
  },
  {
    name: 'login',
    path: '/login',
    element: <Suspender pageName='Login' canGuest />,
    errorElement: <ErrorPage />,
  },
  {
    name: 'register',
    path: '/register',
    element: <Suspender pageName='Register' canGuest />,
    errorElement: <ErrorPage />,
  },
  {
    name: 'admin',
    path: 'admin',
    element: <Suspender pageName='AdminDashboard' canAuth />,
    errorElement: <ErrorPage />,
    children: [
      {
        name: 'admin-list',
        path: ':model',
        element: <Suspender pageName='AdminList' canAuth />,
      },
      {
        name: 'admin-form',
        path: ':model/create',
        element: <Suspender pageName='AdminForm' canAuth />,
      },
      {
        name: 'admin-show',
        path: ':model/:id',
        element: <Suspender pageName='AdminShow' canAuth />,
      },
      {
        name: 'admin-edit',
        path: ':model/:id/edit',
        element: <Suspender pageName='AdminForm' canAuth />,
      },
      {
        name: 'admin-profile',
        path: 'profile',
        element: <Suspender pageName='AdminProfile' canAuth />,
      },
    ],
  },
]

export const Router = createBrowserRouter(ROUTES)
