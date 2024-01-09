import { TypeSeatProps } from 'src/interfaces'

export const SeatUserUsername = (props: TypeSeatProps) => {
  const { seat } = props

  return (
    <div className='dnd-window-body-table-seats-seat-user-username'>
      {('' + seat.user.username).substring(0, 10)}
    </div>
  )
}
