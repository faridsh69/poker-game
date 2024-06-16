import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useAtom } from 'jotai'

import { Loading } from 'src/components/cms/molecules/Loading'
import { PageLayout } from 'src/components/cms/templates/PageLayout'
import { SocketLayout } from 'src/components/cms/templates/SocketLayout'
import { TablePopupContainer } from 'src/components/game/templates/boards/TablePopupContainer'
import { allTablesAtom } from 'src/contexts/allTablesAtom'

const TablePopup = () => {
  const params = useParams()
  const tableId = +(params.tableId || 0)

  const [allTables] = useAtom(allTablesAtom)

  const table = useMemo(() => {
    return allTables.find(table => table.id === +tableId)
  }, [allTables])

  return (
    <SocketLayout>
      {!table ? (
        <PageLayout>
          <Loading />
        </PageLayout>
      ) : (
        <TablePopupContainer table={table} />
      )}
    </SocketLayout>
  )
}

// eslint-disable-next-line import/no-default-export
export default TablePopup
