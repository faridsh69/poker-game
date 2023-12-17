import { useAtom } from 'jotai'
import { Alert } from '@mui/material'

import { allTablesAtom } from 'src/contexts/allTablesAtom'
import { socketAtom } from 'src/contexts/socketAtom'
import { useAuth } from 'src/hooks/useAuth'
import { useSocketConnection } from 'src/hooks/useSocketConnection'
import { PageLayout } from 'src/components/molecules/PageLayout'
import { GameBoard } from 'src/components/organisms/boards/GameBoard'
import { Loading } from 'src/components/molecules/Loading'

export const Home = () => {
  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)
  const [allTables] = useAtom(allTablesAtom)

  const { isConnected } = useSocketConnection()

  if (!username) {
    return (
      <PageLayout>
        <Alert severity='info' variant='outlined' sx={{ m: 3 }}>
          Please login before start
        </Alert>
      </PageLayout>
    )
  }

  if (!socket || !isConnected) {
    return (
      <PageLayout>
        <Alert severity='warning' variant='outlined' color='warning' sx={{ m: 3 }}>
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
