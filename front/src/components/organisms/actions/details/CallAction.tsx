import { useCallback, useMemo } from 'react'
import { useAtom } from 'jotai'

import { Money } from 'src/components/molecules/Money'
import { useAuth } from 'src/hooks/useAuth'
import { socketAtom } from 'src/contexts/socketAtom'
import { ActionButton } from 'src/components/organisms/actions/details/ActionButton'
import { TypeTableProps } from 'src/interfaces'
import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'
import { getCallActionAmount } from 'src/helpers/clientHelpersPoker'

export const CallAction = (props: TypeTableProps) => {
  const { table } = props

  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)

  const callActionAmount = useMemo(() => {
    return getCallActionAmount(table, username)
  }, [table, username])

  const handleCallAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.callAction, { tableId: table.id, callActionAmount, username })
  }, [socket, username, callActionAmount, table.id])

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
