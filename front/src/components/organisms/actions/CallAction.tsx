import { Money } from 'src/components/molecules/Money'
import { ActionButton } from './ActionButton'
import { useCallback, useMemo } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { useAtom } from 'jotai'
import { socketAtom } from 'src/contexts/socketAtom'
import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'
import { getCallActionAmount } from 'src/helpers/clientHelpersPoker'

export const CallAction = (props: any) => {
  const { table } = props

  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)

  const callActionAmount = useMemo(() => {
    return getCallActionAmount(table, username)
  }, [table, username])

  const handleCheckAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.checkAction, { tableId: table.id, username })
  }, [socket, username, table.id])

  const handleCallAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.callAction, { tableId: table.id, callActionAmount, username })
  }, [socket, username, callActionAmount, table.id])

  if (!callActionAmount) {
    return <ActionButton label='Check' onClick={handleCheckAction} />
  }
  return (
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
  )
}
