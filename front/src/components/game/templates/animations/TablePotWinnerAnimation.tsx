import { Money } from '../../molecules/Money'

import { useWinPotAnimation } from 'src/hooks/game/useWinPotAnimation'
import { TypePot } from 'src/interfaces'

type TypeProps = { winnerSeatId: number; tablePot: TypePot }

export const TablePotWinnerAnimation = (props: TypeProps) => {
  const { winnerSeatId, tablePot } = props

  const coordinates = useWinPotAnimation(winnerSeatId, tablePot.id)

  return (
    <div className='dnd-window-body-table-pots-pot-winning' style={coordinates}>
      <Money money={tablePot.amount} showChips />
    </div>
  )
}
