import { Money } from 'src/components/molecules/Money'
import { TypeSeatProps } from 'src/interfaces'

export const SeatUserPot = (props: TypeSeatProps) => {
  const { seat } = props

  const inPot = seat.user.cash.inPot

  if (!inPot) return null

  return (
    <div className='dnd-window-body-table-seats-seat-user-pot'>
      <Money money={inPot} />
    </div>
  )
}
