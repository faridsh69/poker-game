import { useEffect, useMemo, useState } from 'react'
import { Card, CardMedia, CardContent, Button, CardHeader, Slider } from '@mui/material'
import { PageLayout } from 'src/components/templates/PageLayout'

import socketIO from 'socket.io-client'
import tableImage from 'src/images/table.jpg'
import holdemImage from 'src/images/holdem.png'
import omahaImage from 'src/images/omaha.png'
import { SOCKET_URL } from 'src/services/apis'
import { LOCAL_STORAGE_AUTH_USER_EMAIL } from 'src/configs/constants'
import { getLocalstorage } from 'src/helpers/common'

export const Home = () => {
  const username = getLocalstorage(LOCAL_STORAGE_AUTH_USER_EMAIL)
  const [socket, setSocket] = useState(null)

  const [tables, setTables] = useState([])
  const [table, setTable] = useState(null)

  const [raiseAmount, setRaiseAmount] = useState(2)

  console.log('1 1table', table)
  const isSeated = useMemo(() => {
    if (!table) return false

    return !table.waitingUsers.find(u => u.username === username)
  }, [table])

  useEffect(() => {
    const socketInstance = socketIO(SOCKET_URL)
    setSocket(socketInstance)
    // socketInstance.on("connect", () => {
    //   console.log("Connected to server");
    // });

    socketInstance.on('server_tables', tables => {
      setTables(tables)
    })

    socketInstance.on('server_table', ({ table }) => {
      // Notify message
      setTable(table)
    })

    return () => {
      if (socketInstance) {
        socketInstance.disconnect()
      }
    }
  }, [])

  const handleJoinTable = tableId => {
    socket.emit('client_join_table', { tableId, username: username })
  }

  const handleSitUser = seatId => {
    socket.emit('client_sit_user', { tableId: table.id, seatId, username })
  }

  return (
    <PageLayout>
      <div className='home'>
        <div className='home-tables'>
          {tables.map(table => {
            return (
              <Card key={table.id} className='home-tables-table'>
                <CardMedia
                  className='home-tables-table-image'
                  component='img'
                  image={table.type === 'HOLDEM' ? holdemImage : omahaImage}
                  alt={table.type}
                />
                <CardContent className='home-tables-table-content'>
                  <b>
                    #{table.id} {table.title}
                  </b>
                  <Button
                    variant='contained'
                    color='success'
                    onClick={() => handleJoinTable(table.id)}
                  >
                    JOIN TABLE
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
        {table && (
          <Card className='home-runtable'>
            <CardHeader
              className='home-runtable-header'
              title={`#${table.id} - ${table.type}`}
              subheader={table.title}
            />
            <CardContent className='home-runtable-main'>
              <div className='home-runtable-main-sidebar'>
                <div className='home-runtable-main-sidebar-waitinglist'>
                  Waiting List:
                  <ul>
                    {table.waitingUsers.map((u, uIndex) => {
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
                {isSeated && (
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
                {table.seats.map(s => {
                  return (
                    <div key={s.id} className={`home-runtable-main-body-seat seat-${s.id}`}>
                      {!s.user && (
                        <div className='seat-user' onClick={() => handleSitUser(s.id)}>
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
        )}
      </div>
    </PageLayout>
  )
}
