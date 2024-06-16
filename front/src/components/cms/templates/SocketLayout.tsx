import { PageLayout } from '../templates/PageLayout'
import { Alert, AlertTitle } from '@mui/material'
import { useAtom } from 'jotai'

import { socketAtom } from 'src/contexts/socketAtom'
import { isLoggedin } from 'src/helpers/auth'
import { useSocketConnection } from 'src/hooks/game/useSocketConnection'

export const SocketLayout = ({ children }: any) => {
  const isLoggedinUser = isLoggedin()
  const [socket] = useAtom(socketAtom)
  const { isConnected } = useSocketConnection()

  if (!isLoggedinUser) {
    return (
      <PageLayout>
        <Alert severity='info' variant='outlined' sx={{ m: 3 }}>
          <AlertTitle>You are not logged in</AlertTitle>
          Please login before start
        </Alert>
      </PageLayout>
    )
  }

  if (!socket || !isConnected) {
    return (
      <PageLayout>
        <Alert severity='warning' variant='outlined' color='warning' sx={{ m: 3 }}>
          <AlertTitle>Internet connection failed</AlertTitle>
          Please check your internet connection
        </Alert>
      </PageLayout>
    )
  }

  return children
}
