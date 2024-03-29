import { useCallback } from 'react'
import { useAtom } from 'jotai'

import sitoutImage from 'src/images/game/sitout.png'
import { buyinModalAtom } from 'src/contexts/buyinModalAtom'
import { canSeeTableActionsJoinGame } from 'src/helpers/clientHelpersPoker'
import { TypeTableProps } from 'src/interfaces'
import { ActionButton } from 'src/components/game/templates/actions/details/ActionButton'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { JoingameTimer } from 'src/components/game/templates/actions//details/JoingameTimer'
import { getAuthUsername } from 'src/helpers/auth'

export const TableActionsJoinGame = (props: TypeTableProps) => {
  const { table } = props

  const username = getAuthUsername()
  const [, setBuyinModal] = useAtom(buyinModalAtom)

  const { handleJoinGame } = useSocketActions(table.id)

  const onBuyin = useCallback((buyinAmount: number) => {
    handleJoinGame(buyinAmount)
    setBuyinModal({ show: false })
  }, [])

  const handleConfirmJoinGame = () => {
    setBuyinModal({
      show: true,
      table,
      onBuyin,
    })
  }

  if (!canSeeTableActionsJoinGame(table, username)) return null

  return (
    <div className='dnd-window-body-table-actions-joingame'>
      <JoingameTimer table={table} />
      <img src={sitoutImage} alt='smoke - wc' />
      <ActionButton label={<div>Deal Me In</div>} onClick={handleConfirmJoinGame} />
    </div>
  )
}
