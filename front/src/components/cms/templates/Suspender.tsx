import { Suspense, lazy } from 'react'
import { Navigate } from 'react-router-dom'

import { Loading } from 'src/components/cms/molecules/Loading'
import { getAccessToken } from 'src/helpers/auth'
import { TypeSuspenderComponent } from 'src/interfaces'

export const Suspender: TypeSuspenderComponent = props => {
  const { pageName = 'AdminDashboard', canAuth = false, canGuest = false } = props
  const accessToken = getAccessToken()

  if (canAuth && !accessToken) {
    return <Navigate to='/login' replace={true} />
  }

  if (canGuest && accessToken) {
    return <Navigate to='/admin' replace={true} />
  }

  const LazyComponent = lazy(() => import(`../pages/${pageName}.tsx`))

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <LazyComponent />{' '}
      </Suspense>
    </div>
  )
}
