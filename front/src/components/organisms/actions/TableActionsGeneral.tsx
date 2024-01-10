import { Checkbox, FormControlLabel } from '@mui/material'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { useAtom } from 'jotai'
import { socketAtom } from 'src/contexts/socketAtom'
import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'
import { getUserSeat, isTimeToStartTable } from 'src/helpers/clientHelpersPoker'
import { TypeTable } from 'src/interfaces'

export const TableActionsGeneral = (props: { table: TypeTable }) => {
  const { table } = props
  const tableId = table.id

  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)

  const [sitoutChecked, setSitoutChecked] = useState<string>('')

  const authSeat = getUserSeat(table, username)

  const handleChangeCheckbox = useCallback(
    (sitout: string) => {
      setSitoutChecked(sitoutChecked === sitout ? '' : sitout)
    },
    [sitoutChecked],
  )

  const handleLeaveGame = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.leaveGame, { tableId, username })
  }, [socket, username, tableId])

  const isUserInGame = authSeat && !authSeat?.user.isSeatout

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
    <div className='dnd-window-body-table-actions-general'>
      <FormControlLabel
        control={
          <Checkbox
            checked={sitoutChecked === 'hand'}
            onClick={() => handleChangeCheckbox('hand')}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<TaskAltIcon />}
          />
        }
        label='Sit out next hand'
      />
      {/* <FormControlLabel
        control={
          <Checkbox
            checked={sitoutChecked === 'blind'}
            onClick={() => handleChangeCheckbox('blind')}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<TaskAltIcon />}
          />
        }
        label='Sit out next blind'
      /> */}
    </div>
  )
}
