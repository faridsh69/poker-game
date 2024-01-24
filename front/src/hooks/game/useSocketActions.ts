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

  const handleRaiseAction = useCallback(
    (raiseActionAmount: number) => {
      socket.emit(CLIENT_CHANNELS.raiseAction, {
        tableId,
        raiseActionAmount,
        username,
      })
    },
    [socket, username, tableId],
  )

  const handleFoldAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.foldAction, { tableId, username })
  }, [socket, username, tableId])

  const handleLeaveSeat = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.leaveSeat, { tableId, username })
  }, [socket, tableId, username])

  const handleJoinGame = useCallback(
    (buyinAmount: number) => {
      socket.emit(CLIENT_CHANNELS.joinGame, { tableId, username, buyinAmount })
    },
    [socket, username, tableId],
  )

  const handleLeaveGame = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.leaveGame, { tableId, username })
  }, [socket, username, tableId])

  return {
    handleCheckAction,
    handleCallAction,
    handleRaiseAction,
    handleFoldAction,
    handleJoinGame,
    handleLeaveGame,
    handleLeaveSeat,
  }
}
