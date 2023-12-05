// @txs-nocheck
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import socketIO from 'socket.io-client'
import { Card, CardMedia, CardContent, Button, CardHeader, Slider, Modal, Box } from '@mui/material'

import {
  TypeSeatModal,
  TypeServerChannelsUpdateTablesData,
  TypeSocket,
} from 'src/interfaces/type-socket'
import { TypeTable } from 'src/interfaces/type-game'
import { PageLayout } from 'src/components/templates/PageLayout'
import { LOCAL_STORAGE_AUTH_USER_EMAIL } from 'src/configs/constants'
import { getLocalstorage } from 'src/helpers/common'
import { SOCKET_URL } from 'src/services/apis'
import tableImage from 'src/images/table.jpg'
import holdemImage from 'src/images/holdem.png'
import omahaImage from 'src/images/omaha.png'
import {
  findUserTables,
  isUserSeatedTable,
  isUserWaitingTable,
} from 'src/helpers/clientHelpersPoker'
import { CLIENT_CHANNELS, SERVER_CHANNELS } from 'src/configs/clientConstantsPoker'

export const ClientPoker = () => {
  const username = getLocalstorage(LOCAL_STORAGE_AUTH_USER_EMAIL)
  const [socket, setSocket] = useState<TypeSocket>(null)
  const [allTables, setAllTables] = useState<TypeTable[]>([])
  const [raiseAmount, setRaiseAmount] = useState<number>(2)
  const [seatModal, setSeatModal] = useState<TypeSeatModal>({ tableId: 0, seatId: 0 })
  const [buyinAmount, setBuyinAmount] = useState<number>(0)

  const userTables = useMemo(() => {
    return findUserTables(allTables, username)
  }, [allTables, username])

  useEffect(() => {
    const socketInstance = socketIO(SOCKET_URL)
    setSocket(socketInstance)
    socketInstance.on(SERVER_CHANNELS.connect, () => console.log('Connected to server'))

    socketInstance.on(
      SERVER_CHANNELS.updateTables,
      ({ tables, message, checkJoinTabls }: TypeServerChannelsUpdateTablesData) => {
        setAllTables(tables)
        toast.info(message)
        console.log('1 tables', tables)

        if (checkJoinTabls) {
          console.log('checkJoinTabls')
          handleAutoJoinTable(tables, socketInstance)
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

  const handleJoinTable = useCallback(
    (tableId: number) => {
      socket.emit(CLIENT_CHANNELS.joinTable, { tableId, username })
    },
    [socket, username],
  )

  const handleQuitTable = useCallback(
    (tableId: number) => {
      socket.emit(CLIENT_CHANNELS.leaveTable, { tableId, username })
    },
    [socket, username],
  )

  const handleSitTableModal = (tableId: number, seatId: number) => {
    setSeatModal({
      tableId,
      seatId,
    })
  }

  const handleSitTable = useCallback(
    (tableId: number, seatId: number, buyinAmount: number) => {
      socket.emit(CLIENT_CHANNELS.sitTable, { tableId, seatId, buyinAmount, username })
      setSeatModal({
        tableId: 0,
        seatId: 0,
      })
    },
    [socket, username],
  )

  const handleSitoutTable = useCallback(
    (tableId: number) => {
      socket.emit(CLIENT_CHANNELS.sitoutTable, { tableId, username })
    },
    [socket, username],
  )

  return (
    <PageLayout>
      {seatModal.tableId && (
        <Modal open={!!seatModal.tableId} onClose={() => setSeatModal({ tableId: 0, seatId: 0 })}>
          <div className='modal'>
            <h2>Set Buy In</h2>
            <div>
              <Slider
                value={buyinAmount}
                min={userTables.find(t => t.id === seatModal.tableId)?.buyin.min}
                step={1}
                max={userTables.find(t => t.id === seatModal.tableId)?.buyin.max}
                valueLabelFormat={val => '$' + val}
                onChange={(e, val) => setBuyinAmount(+val)}
                valueLabelDisplay='auto'
              />
            </div>
            <Button
              color='success'
              variant='contained'
              onClick={() => handleSitTable(seatModal.tableId, seatModal.seatId, buyinAmount)}
            >
              Seat with {buyinAmount}
            </Button>
          </div>
        </Modal>
      )}
      <div className='home'>
        <div className='home-tables'>
          {allTables.map(allTable => {
            return (
              <Card key={allTable.id} className='home-tables-table'>
                <CardMedia
                  className='home-tables-table-image'
                  component='img'
                  image={allTable.type === 'HOLDEM' ? holdemImage : omahaImage}
                  alt={allTable.type}
                />
                <CardContent className='home-tables-table-content'>
                  <b>
                    #{allTable.id} {allTable.title}
                  </b>
                  <small>
                    FILLED SEATS: {allTable.seats.filter(s => s.user).length} /{' '}
                    {allTable.seats.length}
                  </small>
                  <small>PHASE: {allTable.phase}</small>
                  <Button
                    variant='contained'
                    color='success'
                    disabled={
                      isUserSeatedTable(allTable, username) ||
                      isUserWaitingTable(allTable, username)
                    }
                    onClick={() => handleJoinTable(allTable.id)}
                  >
                    JOIN TABLE
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <div className='home-runtables'>
          {userTables.map(userTable => {
            const isAuthUserSeatedTable = isUserSeatedTable(userTable, username)
            const isAuthUserWaitingTable = isUserWaitingTable(userTable, username)

            return (
              <Card className='home-runtable' key={userTable.id}>
                <CardHeader
                  className='home-runtable-header'
                  title={`#${userTable.id} - ${userTable.type}`}
                  subheader={userTable.title}
                />
                <CardContent className='home-runtable-main'>
                  <div className='home-runtable-main-sidebar'>
                    <div className='home-runtable-main-sidebar-waitinglist'>
                      <Button
                        variant='outlined'
                        color='error'
                        onClick={() => handleQuitTable(userTable.id)}
                      >
                        Quit Table
                      </Button>
                      <br />
                      <br />
                      {isAuthUserSeatedTable && (
                        <Button
                          variant='outlined'
                          color='error'
                          onClick={() => handleSitoutTable(userTable.id)}
                        >
                          Sit Out
                        </Button>
                      )}
                      <br />
                      <br />
                      Waiting List:
                      <ul>
                        {userTable.waitingUsers.map((u, uIndex) => {
                          return <li key={uIndex}>{u.username}</li>
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className='home-runtable-main-body'>
                    <img
                      src={tableImage}
                      alt='poker-table'
                      className='home-runtable-main-body-mainimage'
                    />
                    {isUserSeatedTable(userTable, username) && (
                      <div className='home-runtable-main-body-actions'>
                        <Button variant='outlined' color='success'>
                          Check
                        </Button>
                        <Button variant='outlined' color='error'>
                          Fold
                        </Button>
                        <Button variant='outlined' color='warning'>
                          RAISE
                        </Button>
                        <Slider
                          value={raiseAmount}
                          min={1}
                          step={1}
                          max={100}
                          valueLabelFormat={val => '$' + val}
                          onChange={(e, val) => setRaiseAmount(+val)}
                          valueLabelDisplay='auto'
                          aria-labelledby='non-linear-slider'
                        />
                      </div>
                    )}
                    {userTable.seats.map(s => {
                      return (
                        <div
                          key={s.id}
                          className={`home-runtable-main-body-seat seat-${s.id} ${
                            s.user?.username === username && 'seat-auth'
                          }`}
                        >
                          {!s.user && isAuthUserWaitingTable && (
                            <div
                              className='seat-user'
                              onClick={() => handleSitTableModal(userTable.id, s.id)}
                            >
                              Empty
                            </div>
                          )}
                          {s.user && (
                            <div className='seat-user'>
                              <img src={s.user.avatar} alt={'Pic'} />
                              {s.user.username}
                              <br />
                              {s.user.cash.inGame}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </PageLayout>
  )
}
