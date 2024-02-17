import { useEffect, useState } from 'react'

import { canSeeTableActionsLeaveGame, isTimeToStartTable } from 'src/helpers/clientHelpersPoker'
import { CLIENT_TIMEOUT_QUIT } from 'src/configs/clientConstantsPoker'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { RadioAction } from './details/RadioAction'
import { TypeTableProps } from 'src/interfaces'
import { useAuth } from 'src/hooks/useAuth'

export const TableActionsLeaveGame = (props: TypeTableProps) => {
  const { table } = props
  const tableId = table.id

  const { username } = useAuth()
  const { handleLeaveGame } = useSocketActions(tableId)

  const [stradleChcked, setStradleChcked] = useState<boolean>(false)
  const [sitoutChecked, setSitoutChecked] = useState<boolean>(false)

  const canSee = canSeeTableActionsLeaveGame(table, username)
  const tableWillRestart = isTimeToStartTable(table)

  const forceUserToSeatOut = sitoutChecked && canSee && tableWillRestart

  useEffect(() => {
    if (!forceUserToSeatOut) return

    setTimeout(() => {
      // @todo move it to backend
      handleLeaveGame()
      setSitoutChecked(false)
    }, CLIENT_TIMEOUT_QUIT * 1000)
  }, [forceUserToSeatOut, handleLeaveGame])

  if (!canSee) return null

  return (
    <div className='dnd-window-body-table-actions-leavegame'>
      <RadioAction
        checked={stradleChcked}
        onClick={() => setStradleChcked(!stradleChcked)}
        label='Stradle'
      />
      <RadioAction
        checked={sitoutChecked}
        onClick={() => setSitoutChecked(!sitoutChecked)}
        label='Sit out next hand'
      />
    </div>
  )
}
