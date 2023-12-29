import { useAtom } from 'jotai'
import { useCallback, useMemo, useState } from 'react'

import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'
import { socketAtom } from 'src/contexts/socketAtom'
import { getCallActionAmount, isAuthUserGameTurn } from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import { TypeTable } from 'src/interfaces'
import { ActionButton } from 'src/components/organisms/actions/ActionButton'
import { RaiseButtons } from 'src/components/organisms/actions/RaiseAction'
import { Money } from 'src/components/molecules/Money'

export const TableActionsGameTurn = (props: { table: TypeTable }) => {
  const { table } = props

  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)

  const [raiseActionAmount, setRaiseActionAmount] = useState<number>(0)

  const callActionAmount = useMemo(() => {
    return getCallActionAmount(table, username)
  }, [table, username])

  const handleFoldAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.foldAction, { tableId: table.id, username })
  }, [socket, username, table.id])

  const handleCheckAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.checkAction, { tableId: table.id, username })
  }, [socket, username, table.id])

  const handleCallAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.callAction, { tableId: table.id, callActionAmount, username })
  }, [socket, username, callActionAmount, table.id])

  const handleRaiseAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.raiseAction, { tableId: table.id, raiseActionAmount, username })
  }, [socket, username, raiseActionAmount, table.id])

  if (!isAuthUserGameTurn(table, username)) return null

  return (
    <div className='dnd-window-body-table-actions-gameturn'>
      <div className='dnd-window-body-table-actions-gameturn-raisebuttons'>
        <RaiseButtons
          raiseActionAmount={raiseActionAmount}
          setRaiseActionAmount={setRaiseActionAmount}
          callActionAmount={callActionAmount}
          big={table.big}
        />
      </div>
      <div className='dnd-window-body-table-actions-gameturn-callfold'>
        <ActionButton label='Fold' onClick={handleFoldAction} />
        {!callActionAmount && <ActionButton label='Check' onClick={handleCheckAction} />}
        {!!callActionAmount && (
          <ActionButton
            label={
              <div className='action-button-front-label'>
                <p className='action-button-front-label-p'>Call</p>
                <p className='action-button-front-label-p'>
                  <Money money={callActionAmount} />
                </p>
              </div>
            }
            onClick={handleCallAction}
          />
        )}
        <ActionButton
          label={
            <div className='action-button-front-label'>
              <p className='action-button-front-label-p'>Raise to</p>
              <p className='action-button-front-label-p'>
                <Money money={raiseActionAmount} />
              </p>
            </div>
          }
          onClick={handleRaiseAction}
        />
      </div>
    </div>
  )
}
