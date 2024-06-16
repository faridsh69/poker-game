import { useCallback } from 'react'

import { ActionButton } from './details/ActionButton'
import { useAtom } from 'jotai'

import { RadioAction } from 'src/components/game/templates/actions/details/RadioAction'
import { buyinModalAtom } from 'src/contexts/buyinModalAtom'
import {
  canSeeTableActionsLeaveGame,
  canSeeTableActionsStradle,
  getAuthSeat,
  isSeatoutNextRoundSeat,
  isStradleSeat,
} from 'src/helpers/clientHelpersPoker'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { TypeTableProps } from 'src/interfaces'

export const TableActionsLeaveGame = (props: TypeTableProps) => {
  const { table } = props

  const [, setBuyinModal] = useAtom(buyinModalAtom)
  const { handleStradle, handleSeatoutNextRound, handleBuyChips } = useSocketActions(table.id)

  const authSeat = getAuthSeat(table)

  const onBuyin = useCallback((buyChipsAmount: number) => {
    handleBuyChips(buyChipsAmount)
    setBuyinModal({ show: false })
  }, [])

  const handleOpenModalBuyChips = useCallback(() => {
    setBuyinModal({
      show: true,
      table,
      onBuyin,
      addMoreChips: true,
    })
  }, [table])

  if (!authSeat) return null
  if (!canSeeTableActionsLeaveGame(table)) return null

  const stradleChecked = isStradleSeat(authSeat)
  const sitoutNextRoundChecked = isSeatoutNextRoundSeat(authSeat)

  const canSeeStradle = canSeeTableActionsStradle(table)

  return (
    <div className='popup-table-actions-leavegame'>
      <ActionButton label='Buy Chips' onClick={handleOpenModalBuyChips} />
      {canSeeStradle && <RadioAction checked={stradleChecked} onClick={handleStradle} label='Stradle' />}
      <RadioAction checked={sitoutNextRoundChecked} onClick={handleSeatoutNextRound} label='Sit out next hand' />
    </div>
  )
}
