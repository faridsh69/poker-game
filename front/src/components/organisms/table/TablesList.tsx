import { useAtom } from 'jotai'

import { allTablesAtom } from 'src/contexts/allTablesAtom'
import { TablesItem } from './TablesItem'

export const TablesList = () => {
  const [tables] = useAtom(allTablesAtom)

  return tables.map(table => {
    return <TablesItem key={table.id} table={table} />
  })
}
