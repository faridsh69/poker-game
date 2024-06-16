import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useAtom } from 'jotai'

import socketIO from 'socket.io-client'
import { CLIENT_CHANNELS, SERVER_CHANNELS, TABLE_PASOORS } from 'src/configs/clientConstantsPoker'
import { allTablesAtom } from 'src/contexts/allTablesAtom'
import { lastActionAtom } from 'src/contexts/lastActionAtom'
import { socketAtom } from 'src/contexts/socketAtom'
import { forceLogout, getAccessToken } from 'src/helpers/auth'
import { findUserTables } from 'src/helpers/clientHelpersPoker'
import { errorHandler } from 'src/helpers/errorHandler'
import { TypeServerChannelsUpdateTablesData, TypeSocket, TypeTable } from 'src/interfaces'
import { SOCKET_URL } from 'src/services/apis'

export const useSocketConnection = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true)

  const [, setSocket] = useAtom(socketAtom)
  const [, setAllTables] = useAtom(allTablesAtom)
  const [, setLastAction] = useAtom(lastActionAtom)

  const accessToken = getAccessToken()

  useEffect(() => {
    if (!accessToken) return

    const socketInstance = socketIO(SOCKET_URL, {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    socketInstance.on('connect_error', (error: Error) => {
      setIsConnected(false)
      errorHandler(error, 'connect_error')
      forceLogout(error.message)
    })

    setSocket(socketInstance)
    socketInstance.on(SERVER_CHANNELS.connect, () => setIsConnected(true))

    socketInstance.on(
      SERVER_CHANNELS.updateTables,
      ({ tables, checkJoinTabls, lastAction }: TypeServerChannelsUpdateTablesData) => {
        setLastAction(lastAction)
        setAllTables(
          tables
            .sort((a, b) => (a.blinds.small > b.blinds.small ? 1 : -1))
            .sort((a, b) => (a.pasoor === TABLE_PASOORS.holdem && b.pasoor !== TABLE_PASOORS.holdem ? -1 : 1)),
        )

        // eslint-disable-next-line no-console
        console.info('1 tables', tables)

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

  const handleAutoJoinTable = useCallback((tables: TypeTable[], socketInstance: TypeSocket) => {
    const authTables = findUserTables(tables)

    console.log('2 authTables', authTables)
    for (const authTable of authTables) {
      socketInstance.emit(CLIENT_CHANNELS.joinTable, { tableId: authTable.id })
    }
  }, [])

  return { isConnected }
}
