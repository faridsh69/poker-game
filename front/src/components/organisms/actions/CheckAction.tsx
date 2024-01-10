import { useCallback } from 'react'
import { useAtom } from 'jotai'

import { useAuth } from 'src/hooks/useAuth'
import { socketAtom } from 'src/contexts/socketAtom'
import { ActionButton } from 'src/components/organisms/actions/ActionButton'
import { TypeTableProps } from 'src/interfaces'
import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'

export const CheckAction = (props: TypeTableProps) => {
  const { table } = props

  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)

  const handleCheckAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.checkAction, { tableId: table.id, username })
  }, [socket, username, table.id])

  return <ActionButton label='Check' onClick={handleCheckAction} />
}
