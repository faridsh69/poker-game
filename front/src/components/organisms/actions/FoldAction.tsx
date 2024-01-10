import { useCallback } from 'react'
import { useAtom } from 'jotai'

import { useAuth } from 'src/hooks/useAuth'
import { socketAtom } from 'src/contexts/socketAtom'
import { ActionButton } from 'src/components/organisms/actions/ActionButton'
import { TypeTableProps } from 'src/interfaces'
import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'

export const FoldAction = (props: TypeTableProps) => {
  const { table } = props

  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)

  const handleFoldAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.foldAction, { tableId: table.id, username })
  }, [socket, username, table.id])

  return <ActionButton label='Fold' onClick={handleFoldAction} />
}
