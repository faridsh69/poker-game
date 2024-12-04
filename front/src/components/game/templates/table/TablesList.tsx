import { useMemo } from 'react'

import { TablesItem } from './TablesItem'
import { Table, TableBody, TableContainer, TableHead } from '@mui/material'
import { useAtom } from 'jotai'

import { TableHeader } from 'src/components/cms/templates/TableHeader'
import { allTablesAtom } from 'src/contexts/allTablesAtom'
import { calculateHeadCells, filterTableHeaderCells } from 'src/helpers/table'

export const TablesList = () => {
  const [tables] = useAtom(allTablesAtom)

  const headCells = useMemo(() => {
    return calculateHeadCells([{ title: 'title', 'Buy-in': 1, stakes: 2, players: 3 }])
  }, [])

  return (
    <TableContainer className='holdem'>
      <Table>
        <TableHeader headCells={headCells} />
        <TableBody>
          {tables.map(table => {
            return <TablesItem key={table.id} table={table} />
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
