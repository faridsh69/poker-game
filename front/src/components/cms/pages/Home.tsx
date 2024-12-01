import { ImageLoader } from '../molecules/ImageLoader'
import { PageLayout } from '../templates/layouts/PageLayout'
import { useAtom } from 'jotai'

import { Loading } from 'src/components/cms/molecules/Loading'
import { SocketLayout } from 'src/components/cms/templates/layouts/SocketLayout'
import { GameBoard } from 'src/components/game/templates/boards/GameBoard'
import { allTablesAtom } from 'src/contexts/allTablesAtom'
import HomeImage from 'src/images/game/home.png'

const Home = () => {
  const [allTables] = useAtom(allTablesAtom)

  return (
    <PageLayout>
      <SocketLayout>
        {!allTables.length && <Loading />}
        <ImageLoader src={HomeImage} />
        {/* {!!allTables.length && <GameBoard />} */}
      </SocketLayout>
    </PageLayout>
  )
}

// eslint-disable-next-line import/no-default-export
export default Home
