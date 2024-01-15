import { useAtom } from 'jotai'
import { useAuth } from '../useAuth'
import { socketAtom } from 'src/contexts/socketAtom'
import { useCallback } from 'react'
import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'

export const useSocketActions = (tableId: number) => {
  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)

  const handleCheckAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.checkAction, { tableId: tableId, username })
  }, [socket, username, tableId])

  const handleCallAction = useCallback(
    (callActionAmount: number) => {
      socket.emit(CLIENT_CHANNELS.callAction, { tableId, callActionAmount, username })
    },
    [socket, username, tableId],
  )

  const handleFoldAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.foldAction, { tableId, username })
  }, [socket, username, tableId])

  return {
    handleCheckAction,
    handleCallAction,
    handleFoldAction,
  }
}
