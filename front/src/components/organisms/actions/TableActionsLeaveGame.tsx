import { useCallback, useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import { TypeTableProps } from 'src/interfaces'
import { useAuth } from 'src/hooks/useAuth'
import { socketAtom } from 'src/contexts/socketAtom'
import { CLIENT_CHANNELS, TABLE_PHASES } from 'src/configs/clientConstantsPoker'
import { getUserSeat, isTimeToStartTable } from 'src/helpers/clientHelpersPoker'
import { RadioAction } from './details/RadioAction'

export const TableActionsLeaveGame = (props: TypeTableProps) => {
  const { table } = props
  const tableId = table.id

  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)

  const [sitoutChecked, setSitoutChecked] = useState<string>('')

  const authSeat = getUserSeat(table, username)

  const isUserInGame = authSeat && !authSeat?.user.isSeatout && table.phase !== TABLE_PHASES.wait

  const handleChangeCheckbox = useCallback(
    (sitout: string) => {
      setSitoutChecked(sitoutChecked === sitout ? '' : sitout)
    },
    [sitoutChecked],
  )

  const handleLeaveGame = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.leaveGame, { tableId, username })
  }, [socket, username, tableId])

  useEffect(() => {
    if (!sitoutChecked) return
    if (!authSeat?.user.cards.length || !isUserInGame) return
    if (!isTimeToStartTable(table)) return

    setTimeout(() => {
      handleLeaveGame()
      setSitoutChecked('')
    }, 6000)
  }, [sitoutChecked, table, handleLeaveGame])

  if (!isUserInGame) return null

  return (
    <div className='dnd-window-body-table-actions-leavegame'>
      <RadioAction
        checked={sitoutChecked === 'stradle'}
        onClick={() => handleChangeCheckbox('stradle')}
        label='Stradle'
      />
      <RadioAction
        checked={sitoutChecked === 'hand'}
        onClick={() => handleChangeCheckbox('hand')}
        label='Sit out next hand'
      />
      <RadioAction
        checked={sitoutChecked === 'blind'}
        onClick={() => handleChangeCheckbox('blind')}
        label='Sit out next blind'
      />
    </div>
  )
}
