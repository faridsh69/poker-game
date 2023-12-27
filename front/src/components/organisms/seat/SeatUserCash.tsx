import { TypeSeatProps } from 'src/interfaces'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

export const SeatUserCash = (props: TypeSeatProps) => {
  const { seat } = props

  return (
    <div className='dnd-window-body-table-seats-seat-user-cash'>
      <span>
        <AttachMoneyIcon />
      </span>
      <span>{seat.user.cash.inGame}</span>
    </div>
  )
}
