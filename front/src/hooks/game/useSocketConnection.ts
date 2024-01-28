import { useAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import socketIO from 'socket.io-client'
import { toast } from 'react-toastify'

import { TypeServerChannelsUpdateTablesData, TypeSocket, TypeTable } from 'src/interfaces'
import { CLIENT_CHANNELS, SERVER_CHANNELS } from 'src/configs/clientConstantsPoker'
import { socketAtom } from 'src/contexts/socketAtom'
import { SOCKET_URL } from 'src/services/apis'
import { findUserTables } from 'src/helpers/clientHelpersPoker'

import { allTablesAtom } from 'src/contexts/allTablesAtom'
import { lastActionAtom } from 'src/contexts/lastActionAtom'
import { useAuth } from '../useAuth'

export const useSocketConnection = () => {
  const { username } = useAuth()

  const [isConnected, setIsConnected] = useState<boolean>(false)

  const [, setSocket] = useAtom(socketAtom)
  const [, setAllTables] = useAtom(allTablesAtom)
  const [, setLastAction] = useAtom(lastActionAtom)

  useEffect(() => {
    const socketInstance = socketIO(SOCKET_URL)

    setSocket(socketInstance)
    socketInstance.on(SERVER_CHANNELS.connect, () => setIsConnected(true))

    socketInstance.on(
      SERVER_CHANNELS.updateTables,
      ({ tables, checkJoinTabls, lastAction }: TypeServerChannelsUpdateTablesData) => {
        setLastAction(lastAction)
        setAllTables(tables)

        console.log('1 tables', tables)

        if (checkJoinTabls) {
          handleAutoJoinTable(tables, socketInstance)
        }
      },
    )

    socketInstance.on(SERVER_CHANNELS.exception, error => toast.error(error.message))

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  const handleAutoJoinTable = useCallback(
    (tables: TypeTable[], socketInstance: TypeSocket) => {
      const userTables = findUserTables(tables, username)

      for (const userTable of userTables) {
        socketInstance.emit(CLIENT_CHANNELS.joinTable, { tableId: userTable.id, username })
      }
    },
    [username],
  )

  return { isConnected }
}
