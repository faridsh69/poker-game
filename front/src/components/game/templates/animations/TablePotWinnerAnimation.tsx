import { Money } from 'src/components/game/molecules/Money'
import { useWinPotAnimation } from 'src/hooks/game/useWinPotAnimation'

type TypeProps = { winnerSeatId: number; tablePotAmount: number; tablePotId: number }

export const TablePotWinnerAnimation = (props: TypeProps) => {
  const { winnerSeatId, tablePotAmount, tablePotId } = props

  const coordinates = useWinPotAnimation(winnerSeatId, tablePotId)

  return (
    <div className='dnd-window-body-table-pots-pot-winning' style={coordinates}>
      <Money money={tablePotAmount} showChips />
    </div>
  )
}
