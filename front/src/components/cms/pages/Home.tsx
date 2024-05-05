import { Alert, AlertTitle } from '@mui/material'
import { useAtom } from 'jotai'

import { Loading } from 'src/components/cms/molecules/Loading'
import { PageLayout } from 'src/components/cms/templates/PageLayout'
import { GameBoard } from 'src/components/game/templates/boards/GameBoard'
import { allTablesAtom } from 'src/contexts/allTablesAtom'
import { socketAtom } from 'src/contexts/socketAtom'
import { isLoggedin } from 'src/helpers/auth'
import { useSocketConnection } from 'src/hooks/game/useSocketConnection'

const Home = () => {
  const isLoggedinUser = isLoggedin()
  const [socket] = useAtom(socketAtom)
  const [allTables] = useAtom(allTablesAtom)

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

  if (!allTables.length)
    return (
      <PageLayout>
        <Loading />
      </PageLayout>
    )

  return <GameBoard />
}

// eslint-disable-next-line import/no-default-export
export default Home
