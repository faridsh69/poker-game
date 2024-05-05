import { TablesItem } from './TablesItem'
import { Paper, Table, TableBody, TableContainer } from '@mui/material'
import { useAtom } from 'jotai'

import { allTablesAtom } from 'src/contexts/allTablesAtom'

export const TablesList = () => {
  const [tables] = useAtom(allTablesAtom)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableBody>
          {tables.map(table => {
            return <TablesItem key={table.id} table={table} />
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
