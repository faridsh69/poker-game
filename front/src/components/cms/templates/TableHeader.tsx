import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'

import { TypePropsTableHeader } from 'src/interfaces'

export const TableHeader = (props: TypePropsTableHeader) => {
  const { onSelectAllClick, order, orderBy, numSelected = 0, rowCount = 0, onRequestSort, headCells } = props

  const createSortHandler = (property: string) => (event: React.MouseEvent) => {
    onRequestSort?.(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {onSelectAllClick && (
          <TableCell padding='checkbox'>
            <Checkbox
              color='primary'
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
        )}
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span'>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
