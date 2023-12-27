import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

import { TypeTableProps } from 'src/interfaces'

export const TableTotalPot = (props: TypeTableProps) => {
  const { table } = props

  console.log('1 table', table)
  return (
    <div className='dnd-window-body-table-total'>
      <div>Total Pot :</div>
      <div className='money-icon'>
        <AttachMoneyIcon />
      </div>
      <div>{table.pot}</div>
    </div>
  )
}
