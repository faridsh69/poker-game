import { useCallback, useEffect } from 'react'

import { useAtom } from 'jotai'

import { JoingameTimer } from 'src/components/game/templates/actions//details/JoingameTimer'
import { ActionButton } from 'src/components/game/templates/actions/details/ActionButton'
import { buyinModalAtom } from 'src/contexts/buyinModalAtom'
import { getAuthUsername } from 'src/helpers/auth'
import { canSeeTableActionsJoinGame } from 'src/helpers/clientHelpersPoker'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import sitoutImage from 'src/images/game/sitout.png'
import { TypeTableProps } from 'src/interfaces'

export const TableActionsJoinGame = (props: TypeTableProps) => {
  const { table } = props

  const username = getAuthUsername()
  const [, setBuyinModal] = useAtom(buyinModalAtom)

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

  const canSee = canSeeTableActionsJoinGame(table, username)

  useEffect(() => {
    if (!canSee) return

    handleConfirmJoinGame()
  }, [canSee])

  if (!canSee) return null

  return (
    <div className='dnd-window-body-table-actions-joingame'>
      <JoingameTimer table={table} />
      <img src={sitoutImage} alt='smoke - wc' />
      <ActionButton label={<div>Deal Me In</div>} onClick={handleConfirmJoinGame} />
    </div>
  )
}
