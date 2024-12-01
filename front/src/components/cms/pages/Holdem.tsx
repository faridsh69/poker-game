import { PageLayout } from '../templates/layouts/PageLayout'
import { useAtom } from 'jotai'

import { Loading } from 'src/components/cms/molecules/Loading'
import { SocketLayout } from 'src/components/cms/templates/layouts/SocketLayout'
import { TablesList } from 'src/components/game/templates/table/TablesList'
import { allTablesAtom } from 'src/contexts/allTablesAtom'

const Holdem = () => {
  const [allTables] = useAtom(allTablesAtom)

  return (
    <PageLayout>
      <SocketLayout>
        {!allTables.length && <Loading />}

        {!!allTables.length && <TablesList />}
      </SocketLayout>
    </PageLayout>
  )
}

// eslint-disable-next-line import/no-default-export
export default Holdem
