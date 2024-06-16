import { Money } from 'src/components/game/molecules/Money/Money'
import { useThrowPotAnimation } from 'src/hooks/game/useThrowPotAnimation'

type TypeProps = { inPot: number; lastUserPot: number; seatId: number }

export const SeatUserPotThrowingAnimation = (props: TypeProps) => {
  const { inPot, lastUserPot, seatId } = props

  const { coordinates, restOfUserPotAnimation } = useThrowPotAnimation(seatId, inPot, lastUserPot)

  return (
    <div className='dnd-window-body-table-seats-seat-user-pot-throwing' style={coordinates}>
      {!!restOfUserPotAnimation && <Money money={restOfUserPotAnimation} showChips />}
    </div>
  )
}
