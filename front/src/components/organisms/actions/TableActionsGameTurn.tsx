import { useAtom } from 'jotai'
import { useCallback } from 'react'

import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'
import { socketAtom } from 'src/contexts/socketAtom'
import { isAuthUserGameTurn } from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import { TypeTable } from 'src/interfaces'
import { ActionButton } from 'src/components/organisms/actions/ActionButton'
import { RaiseButtons } from 'src/components/organisms/actions/RaiseAction'
import { CallAction } from './CallAction'

export const TableActionsGameTurn = (props: { table: TypeTable }) => {
  const { table } = props

  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)

  const handleFoldAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.foldAction, { tableId: table.id, username })
  }, [socket, username, table.id])

  if (!isAuthUserGameTurn(table, username)) return null

  return (
    <div className='dnd-window-body-table-actions-gameturn'>
      <div className='dnd-window-body-table-actions-gameturn-raisebuttons'>
        <RaiseButtons table={table} />
      </div>
      <div className='dnd-window-body-table-actions-gameturn-callfold'>
        <ActionButton label='Fold' onClick={handleFoldAction} />
        <CallAction table={table} />
      </div>
    </div>
  )
}
