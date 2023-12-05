// @ts-nocheck
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import socketIO from 'socket.io-client'
import { Card, CardMedia, CardContent, Button, CardHeader, Slider, IconButton } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'

import { PageLayout } from 'src/components/templates/PageLayout'
import { LOCAL_STORAGE_AUTH_USER_EMAIL } from 'src/configs/constants'
import { isUserSeatedTable, isUserWaitingTable } from 'src/helpers/game'
import { getLocalstorage } from 'src/helpers/common'
import { SOCKET_URL } from 'src/services/apis'
import tableImage from 'src/images/table.jpg'
import holdemImage from 'src/images/holdem.png'
import omahaImage from 'src/images/omaha.png'
import { CLIENT_CHANNELS, SERVER_CHANNELS } from 'src/configs/game'

export const Poker = () => {
  const username = getLocalstorage(LOCAL_STORAGE_AUTH_USER_EMAIL)
  const [socket, setSocket] = useState(null)

  const [allTables, setAllTables] = useState([])

  const userTables = useMemo(() => {
    return allTables.filter(t => {
      const isUserSeated = isUserSeatedTable(t, username)
      const isUserWaited = isUserWaitingTable(t, username)

      return isUserSeated || isUserWaited
    })
  }, [allTables, username])

  const [raiseAmount, setRaiseAmount] = useState(2)

  useEffect(() => {
    const socketInstance = socketIO(SOCKET_URL)
    setSocket(socketInstance)
    socketInstance.on('connect', () => console.log('Connected to server'))

    socketInstance.on(SERVER_CHANNELS.updateTables, ({ tables, message }) => {
      toast.info(message)
      console.log('1 tables', tables)
      setAllTables(tables)
    })

    return () => socketInstance.disconnect()
  }, [])

  const handleJoinTable = useCallback(
    tableId => {
      socket.emit(CLIENT_CHANNELS.joinTable, { tableId, username })
    },
    [socket, username],
  )

  const handleQuitTable = useCallback(
    tableId => {
      socket.emit(CLIENT_CHANNELS.leaveTable, { tableId, username })
    },
    [socket, username],
  )

  const handleSitTable = useCallback(
    (tableId, seatId) => {
      socket.emit(CLIENT_CHANNELS.sitTable, { tableId, seatId, username })
    },
    [socket, username],
  )

  const handleSitoutTable = useCallback(
    tableId => {
      socket.emit(CLIENT_CHANNELS.sitoutTable, { tableId, username })
    },
    [socket, username],
  )

  return (
    <PageLayout>
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
                      Waiting List:
                      <ul>
                        {userTable.waitingUsers.map((u, uIndex) => {
                          return (
                            <li key={uIndex}>
                              {u.username}{' '}
                              {u.username === username && (
                                <Button
                                  variant='outlined'
                                  color='error'
                                  onClick={() => handleQuitTable(userTable.id)}
                                >
                                  Quit Table
                                </Button>
                              )}
                            </li>
                          )
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
                          onChange={(e, val) => setRaiseAmount(val)}
                          valueLabelDisplay='auto'
                          aria-labelledby='non-linear-slider'
                        />
                      </div>
                    )}
                    {userTable.seats.map(s => {
                      return (
                        <div key={s.id} className={`home-runtable-main-body-seat seat-${s.id}`}>
                          {!s.user && isAuthUserWaitingTable && (
                            <div
                              className='seat-user'
                              onClick={() => handleSitTable(userTable.id, s.id)}
                            >
                              Empty
                            </div>
                          )}
                          {s.user && (
                            <div className='seat-user'>
                              <img src={s.user.avatar} alt={s.user.username} />
                              {s.user.username}
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
