import { useAtom } from 'jotai'
import { useAuth } from '../useAuth'
import { socketAtom } from 'src/contexts/socketAtom'
import { useCallback } from 'react'
import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'

export const useSocketActions = (tableId: number) => {
  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)

  const handleJoinTable = useCallback(
    (tId: number) => {
      socket.emit(CLIENT_CHANNELS.joinTable, { tableId: tId, username })
    },
    [socket, username],
  )

  const handleLeaveTable = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.leaveTable, { tableId, username })
  }, [socket, username, tableId])

  const handleJoinSeat = useCallback(
    (seatId: number) => {
      socket.emit(CLIENT_CHANNELS.joinSeat, { tableId, username, seatId })
    },
    [socket, username, tableId],
  )

  // const handleLeaveSeat = useCallback(() => {
  //   socket.emit(CLIENT_CHANNELS.leaveSeat, { tableId, username })
  // }, [socket, username, tableId])

  const handleJoinGame = useCallback(
    (buyinAmount: number) => {
      socket.emit(CLIENT_CHANNELS.joinGame, { tableId, username, buyinAmount })
    },
    [socket, username, tableId],
  )

  const handleWaitForBB = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.waitForBB, { tableId, username })
  }, [socket, username, tableId])

  const handleLeaveGame = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.leaveGame, { tableId, username })
  }, [socket, username, tableId])

  // START ACTIONS
  const handleCheckAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.checkAction, { tableId, username })
  }, [socket, username, tableId])

  const handleFoldAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.foldAction, { tableId, username })
  }, [socket, username, tableId])

  const handleCallAction = useCallback(
    (callActionAmount: number) => {
      socket.emit(CLIENT_CHANNELS.callAction, { tableId, username, callActionAmount })
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

  const handleTimeBankAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.timeBankAction, { tableId, username })
  }, [socket, username, tableId])

  const handleShowCardAction = useCallback(
    (cardIndexes: number[]) => {
      socket.emit(CLIENT_CHANNELS.showCardAction, { tableId, username, cardIndexes })
    },
    [socket, username, tableId],
  )
  // FINISH ACTIONS

  const handleStradle = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.stradle, { tableId, username })
  }, [socket, username, tableId])

  const handleSeatoutNextRound = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.stradle, { tableId, username })
  }, [socket, username, tableId])

  return {
    handleJoinTable,
    handleLeaveTable,

    handleJoinSeat,
    // handleLeaveSeat,

    handleJoinGame,
    handleWaitForBB,
    handleLeaveGame,

    handleCheckAction,
    handleFoldAction,
    handleCallAction,
    handleRaiseAction,

    handleTimeBankAction,
    handleShowCardAction,

    handleStradle,
    handleSeatoutNextRound,
  }
}
