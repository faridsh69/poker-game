import { useCallback, useEffect } from 'react'

import { useAtom } from 'jotai'

import { JoingameTimer } from 'src/components/game/templates/actions//details/JoingameTimer'
import { ActionButton } from 'src/components/game/templates/actions/details/ActionButton'
import { DELAY_OEPN_MODAL } from 'src/configs/clientConstantsPoker'
import { buyinModalAtom, deadlineAutoJoinGameAtom } from 'src/contexts/buyinModalAtom'
import { canSeeTableActionsJoinGame, getDeadline } from 'src/helpers/clientHelpersPoker'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import sitoutImage from 'src/images/game/sitout.png'
import { TypeTableProps } from 'src/interfaces'

export const TableActionsJoinGame = (props: TypeTableProps) => {
  const { table } = props

  const [, setBuyinModal] = useAtom(buyinModalAtom)
  const [deadlineAutoJoinGame, setDeadlineAutoJoinGame] = useAtom(deadlineAutoJoinGameAtom)

  const { handleJoinGame } = useSocketActions(table.id)

  const onBuyin = useCallback((buyinAmount: number) => {
    handleJoinGame(buyinAmount)
    setBuyinModal({ show: false })
  }, [])

  const handleConfirmJoinGame = useCallback(() => {
    setBuyinModal({
      show: true,
      table,
      onBuyin,
    })
  }, [table])

  const canSeeJoinGameActions = canSeeTableActionsJoinGame(table)

  useEffect(() => {
    const now = getDeadline(0)
    const newDeadline = getDeadline(DELAY_OEPN_MODAL)

    if (!canSeeJoinGameActions || deadlineAutoJoinGame > now) return

    setDeadlineAutoJoinGame(newDeadline)
    handleConfirmJoinGame()
  }, [canSeeJoinGameActions])

  if (!canSeeJoinGameActions) return null

  return (
    <div className='popup-table-actions-joingame'>
      <JoingameTimer table={table} />
      <img src={sitoutImage} alt='smoke - wc' />
      <ActionButton label={<div>Deal Me In</div>} onClick={handleConfirmJoinGame} />
    </div>
  )
}
