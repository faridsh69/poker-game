import { useCallback, useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import socketIO from 'socket.io-client'
import { toast } from 'react-toastify'

import { TypeServerChannelsUpdateTablesData, TypeSocket, TypeTable } from 'src/interfaces'
import { CLIENT_CHANNELS, SERVER_CHANNELS } from 'src/configs/clientConstantsPoker'
import { socketAtom } from 'src/contexts/socketAtom'
import { SOCKET_URL } from 'src/services/apis'
import { findUserTables } from 'src/helpers/clientHelpersPoker'
import { allTablesAtom } from 'src/contexts/allTablesAtom'
import { lastActionAtom } from 'src/contexts/lastActionAtom'
import { forceLogout, getAccessToken, getAuthUsername } from 'src/helpers/auth'
import { errorHandler } from 'src/helpers/errorHandler'
import {
  BAD_REQUEST_HTTP_CODE,
  UNAUTHORIZED_ERROR,
  UNAUTHORIZED_HTTP_CODE,
} from 'src/configs/constants'

export const useSocketConnection = () => {
  const username = getAuthUsername()
  const accessToken = getAccessToken()

  const [isConnected, setIsConnected] = useState<boolean>(true)

  const [, setSocket] = useAtom(socketAtom)
  const [, setAllTables] = useAtom(allTablesAtom)
  const [, setLastAction] = useAtom(lastActionAtom)

  useEffect(() => {
    if (!accessToken) return

    const socketInstance = socketIO(SOCKET_URL, {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    socketInstance.on('connect_error', (error: Error) => {
      setIsConnected(false)
      errorHandler(error)
      forceLogout({
        // @ts-ignore
        response: {
          status:
            error.message === UNAUTHORIZED_ERROR ? UNAUTHORIZED_HTTP_CODE : BAD_REQUEST_HTTP_CODE,
        },
      })
    })

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
