import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { Loading } from '../molecules/Loading'
import { PageLayout } from '../templates/PageLayout'
import { TablePopupContainer } from '../templates/TablePopupContainer'
import { SocketLayout } from './SocketLayout'
import { useAtom } from 'jotai'

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
