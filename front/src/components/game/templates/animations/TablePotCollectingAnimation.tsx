import { Money } from '../../molecules/Money/Money'

import { useCollectPotAnimation } from 'src/hooks/game/useCollectPotAnimation'
import { TypeUserPot } from 'src/interfaces'

type TypeProps = {
  userPot: TypeUserPot
  tablePotId: number
}

export const TablePotCollectingAnimation = (props: TypeProps) => {
  const { userPot, tablePotId } = props

  const { left, top } = useCollectPotAnimation(userPot.seatId, tablePotId)

  return (
    <div className='dnd-window-body-table-pots-pot-collecting' style={{ left, top }}>
      <Money money={userPot.inPot} showChips />
    </div>
  )
}
