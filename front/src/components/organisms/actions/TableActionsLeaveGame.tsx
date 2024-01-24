import { useEffect, useState } from 'react'

import { TypeTableProps } from 'src/interfaces'
import { useAuth } from 'src/hooks/useAuth'
import { CLIENT_TIMEOUT_QUIT } from 'src/configs/clientConstantsPoker'
import { isTimeToStartTable, isUserPlayingGame } from 'src/helpers/clientHelpersPoker'
import { RadioAction } from './details/RadioAction'
import { useSocketActions } from 'src/hooks/game/useSocketActions'

export const TableActionsLeaveGame = (props: TypeTableProps) => {
  const { table } = props
  const tableId = table.id

  const { username } = useAuth()
  const { handleLeaveGame } = useSocketActions(tableId)

  const [stradleChcked, setStradleChcked] = useState<boolean>(false)
  const [sitoutChecked, setSitoutChecked] = useState<boolean>(false)

  const userIsPlayingGame = isUserPlayingGame(table, username)
  const tableWillRestart = isTimeToStartTable(table)

  const forceUserToSeatOut = sitoutChecked && userIsPlayingGame && tableWillRestart

  useEffect(() => {
    if (!forceUserToSeatOut) return

    setTimeout(() => {
      handleLeaveGame()
      setSitoutChecked(false)
    }, CLIENT_TIMEOUT_QUIT * 1000)
  }, [forceUserToSeatOut, handleLeaveGame])

  if (!userIsPlayingGame) return null

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
