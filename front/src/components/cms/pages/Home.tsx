import { SocketLayout } from './SocketLayout'
import { useAtom } from 'jotai'

import { Loading } from 'src/components/cms/molecules/Loading'
import { PageLayout } from 'src/components/cms/templates/PageLayout'
import { GameBoard } from 'src/components/game/templates/boards/GameBoard'
import { allTablesAtom } from 'src/contexts/allTablesAtom'

const Home = () => {
  const [allTables] = useAtom(allTablesAtom)

  return (
    <SocketLayout>
      {!allTables.length ? (
        <PageLayout>
          <Loading />
        </PageLayout>
      ) : (
        <GameBoard />
      )}
    </SocketLayout>
  )
}

// eslint-disable-next-line import/no-default-export
export default Home
