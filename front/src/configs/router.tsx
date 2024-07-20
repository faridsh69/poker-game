import { createBrowserRouter } from 'react-router-dom'

import { ErrorPage } from 'src/components/cms/molecules/ErrorPage'
import { Suspender } from 'src/components/cms/templates/Suspender'
import { RoutesType } from 'src/interfaces'

export const ROUTES_PATH_NAMES = {
  home: '/',
  login: '/login',
  register: '/register',
  tablePopup: '/tables',
  profile: '/profile',
  password: '/password',
  admin: '/admin',
}

const ROUTES: RoutesType = [
  {
    path: ROUTES_PATH_NAMES.home,
    element: <Suspender pageName='Home' />,
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTES_PATH_NAMES.login,
    element: <Suspender pageName='Login' canGuest />,
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTES_PATH_NAMES.register,
    element: <Suspender pageName='Register' canGuest />,
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTES_PATH_NAMES.profile,
    element: <Suspender pageName='UserProfile' canAuth />,
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTES_PATH_NAMES.password,
    element: <Suspender pageName='UserPassword' canAuth />,
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTES_PATH_NAMES.tablePopup,
    element: <Suspender pageName='TablePopup' canAuth />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ':tableId',
        element: <Suspender pageName='TablePopup' canAuth />,
      },
    ],
  },
  {
    path: ROUTES_PATH_NAMES.admin,
    element: <Suspender pageName='AdminDashboard' canAuth />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ':model',
        element: <Suspender pageName='AdminList' canAuth />,
      },
      {
        path: ':model/create',
        element: <Suspender pageName='AdminForm' canAuth />,
      },
      {
        path: ':model/:id',
        element: <Suspender pageName='AdminShow' canAuth />,
      },
      {
        path: ':model/:id/edit',
        element: <Suspender pageName='AdminForm' canAuth />,
      },
    ],
  },
]

export const Router = createBrowserRouter(ROUTES)
