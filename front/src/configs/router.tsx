import { createBrowserRouter } from 'react-router-dom'

import { Suspender } from 'src/components/organisms/Suspender'
import { ErrorPage } from 'src/components/molecules/ErrorPage'
import { RoutesType } from 'src/interfaces'
import { ClientPoker } from 'src/components/pages/ClientPoker'

const ROUTES: RoutesType = [
  {
    name: 'ClientPoker',
    path: '/',
    element: <ClientPoker />,
    errorElement: <ErrorPage />,
  },
  {
    name: 'login',
    path: '/login',
    element: <Suspender pageName='Login' guest />,
    errorElement: <ErrorPage />,
  },
  {
    name: 'admin',
    path: 'admin',
    element: <Suspender pageName='AdminLayout' auth />,
    errorElement: <ErrorPage />,
    children: [
      {
        name: 'admin-list',
        path: ':model',
        element: <Suspender pageName='AdminList' auth />,
      },
      {
        name: 'admin-profile',
        path: 'profile',
        element: <Suspender pageName='AdminProfile' auth />,
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
    ],
  },
]

export const Router = createBrowserRouter(ROUTES)
