import { useCallback } from 'react'
import { useAtom } from 'jotai'

import { socketAtom } from 'src/contexts/socketAtom'
import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'

export const useSocketActions = (tableId: number) => {
  const [socket] = useAtom(socketAtom)

  const handleJoinTable = useCallback(
    (tableId: number) => {
      socket.emit(CLIENT_CHANNELS.joinTable, { tableId })
    },
    [socket],
  )

  const handleLeaveTable = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.leaveTable, { tableId })
  }, [socket, tableId])

  const handleJoinSeat = useCallback(
    (seatId: number) => {
      socket.emit(CLIENT_CHANNELS.joinSeat, { tableId, seatId })
    },
    [socket, tableId],
  )

  const handleJoinGame = useCallback(
    (buyinAmount: number) => {
      socket.emit(CLIENT_CHANNELS.joinGame, { tableId, buyinAmount })
    },
    [socket, tableId],
  )

  const handleWaitForBB = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.waitForBB, { tableId })
  }, [socket, tableId])

  // START ACTIONS
  const handleCheckAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.checkAction, { tableId })
  }, [socket, tableId])

  const handleFoldAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.foldAction, { tableId })
  }, [socket, tableId])

  const handleCallAction = useCallback(
    (callActionAmount: number) => {
      socket.emit(CLIENT_CHANNELS.callAction, { tableId, callActionAmount })
    },
    [socket, tableId],
  )

  const handleRaiseAction = useCallback(
    (raiseActionAmount: number) => {
      socket.emit(CLIENT_CHANNELS.raiseAction, {
        tableId,
        raiseActionAmount,
      })
    },
    [socket, tableId],
  )

  const handleTimeBankAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.timeBankAction, { tableId })
  }, [socket, tableId])

  const handleShowCardAction = useCallback(
    (cardIndexes: number[]) => {
      socket.emit(CLIENT_CHANNELS.showCardAction, { tableId, cardIndexes })
    },
    [socket, tableId],
  )
  // FINISH ACTIONS

  const handleStradle = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.stradle, { tableId })
  }, [socket, tableId])

  const handleSeatoutNextRound = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.seatoutNextRound, { tableId })
  }, [socket, tableId])

  return {
    handleJoinTable,
    handleLeaveTable,

    handleJoinSeat,

    handleJoinGame,
    handleWaitForBB,

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
