import { CountDownTimer } from 'src/components/molecules/CountDownTimer'
import { TypeSeatProps } from 'src/interfaces'

export const SeatUserTimer = (props: TypeSeatProps) => {
  const { seat } = props

  if (!seat.user?.gameTurn) return null

  return (
    <div className='dnd-window-body-table-seats-seat-user-timeout'>
      <CountDownTimer timeout={15} onFinishTimer={() => {}} circle={false} showText={false} />
    </div>
  )
}
