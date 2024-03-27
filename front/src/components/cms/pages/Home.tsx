import { useAtom } from 'jotai'
import { Alert, AlertTitle } from '@mui/material'

import { allTablesAtom } from 'src/contexts/allTablesAtom'
import { socketAtom } from 'src/contexts/socketAtom'
import { useAuth } from 'src/hooks/useAuth'
import { useSocketConnection } from 'src/hooks/game/useSocketConnection'
import { PageLayout } from 'src/components/cms/templates/PageLayout'
import { Loading } from 'src/components/cms/molecules/Loading'
import { setLocalsotrage } from 'src/helpers/common'
import { LOCAL_STORAGE_AUTH_USER_EMAIL } from 'src/configs/constants'
import { GameBoard } from 'src/components/game/templates/boards/GameBoard'

const Home = () => {
  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)
  const [allTables] = useAtom(allTablesAtom)

  const { isConnected } = useSocketConnection()

  if (!username) {
    return (
      <PageLayout>
        <Alert
          severity='info'
          variant='outlined'
          sx={{ m: 3 }}
          onClose={() => {
            setLocalsotrage(LOCAL_STORAGE_AUTH_USER_EMAIL, Math.random())
          }}
        >
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

  if (!allTables.length)
    return (
      <PageLayout>
        <Loading />
      </PageLayout>
    )

  return <GameBoard />
}

export default Home
