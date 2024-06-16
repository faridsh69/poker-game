import { TypeSeatProps } from 'src/interfaces'

export const SeatUserUsername = (props: TypeSeatProps) => {
  const { seat } = props

  return (
    <div className='popup-table-seats-seat-user-username' title={seat.user.username}>
      {seat.user.username}
    </div>
  )
}
