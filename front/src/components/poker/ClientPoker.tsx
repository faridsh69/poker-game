import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import socketIO from 'socket.io-client'

import { TypeServerChannelsUpdateTablesData, TypeSocket, TypeTable } from 'src/interfaces/type-game'
import { PageLayout } from 'src/components/templates/PageLayout'
import { LOCAL_STORAGE_AUTH_USER_EMAIL } from 'src/configs/constants'
import { getLocalstorage } from 'src/helpers/common'
import { SOCKET_URL } from 'src/services/apis'
import { findUserTables } from 'src/helpers/clientHelpersPoker'
import { CLIENT_CHANNELS, SERVER_CHANNELS } from 'src/configs/clientConstantsPoker'
import { TablesList } from 'src/components/poker/molecules/TablesList'
import { UserTable } from 'src/components/poker/molecules/UserTable'

export const ClientPoker = () => {
  const username = getLocalstorage(LOCAL_STORAGE_AUTH_USER_EMAIL)
  const [socket, setSocket] = useState<TypeSocket | null>(null)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [allTables, setAllTables] = useState<TypeTable[]>([])

  const userTables = useMemo(() => {
    return findUserTables(allTables, username)
  }, [allTables, username])

  useEffect(() => {
    const socketInstance = socketIO(SOCKET_URL)
    setSocket(socketInstance)
    socketInstance.on(SERVER_CHANNELS.connect, () => setIsConnected(true))

    socketInstance.on(
      SERVER_CHANNELS.updateTables,
      ({ tables, message, checkJoinTabls }: TypeServerChannelsUpdateTablesData) => {
        setAllTables(tables)
        toast.info(message)
        console.log('1 tables', tables)

        if (checkJoinTabls) {
          // handleAutoJoinTable(tables, socketInstance)
        }
      },
    )

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

  if (!username) return <PageLayout>Please login</PageLayout>

  if (!socket || !isConnected) return <PageLayout>Please check your connection</PageLayout>

  return (
    <PageLayout>
      <div className='home'>
        <div className='home-tables'>
          <TablesList tables={allTables} username={username} socket={socket} />
        </div>
        <div className='home-runtables'>
          {userTables.map(userTable => {
            return <UserTable table={userTable} username={username} socket={socket} />
          })}
        </div>
      </div>
    </PageLayout>
  )
}
