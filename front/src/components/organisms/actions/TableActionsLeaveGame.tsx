import { useCallback, useEffect, useState } from 'react'

import { TypeTableProps } from 'src/interfaces'
import { useAuth } from 'src/hooks/useAuth'
import { USER_SITOUT_NEXT_BLIND_TIMEOUT_SECONDS } from 'src/configs/clientConstantsPoker'
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

  useEffect(() => {
    console.log('1 sitoutChecked', sitoutChecked)
    console.log('2 userIsPlayingGame', userIsPlayingGame)
    console.log('3 tableWillRestart', tableWillRestart)

    if (!sitoutChecked || !userIsPlayingGame || !tableWillRestart) return
    console.log('DONE')

    setTimeout(() => {
      handleLeaveGame()
      setSitoutChecked(false)
    }, USER_SITOUT_NEXT_BLIND_TIMEOUT_SECONDS)
  }, [sitoutChecked, userIsPlayingGame, handleLeaveGame, tableWillRestart])

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
