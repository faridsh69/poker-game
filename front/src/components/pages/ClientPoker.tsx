// @txs-nocheck
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import socketIO from 'socket.io-client'
import { Card, CardMedia, CardContent, Button, CardHeader, Slider, Modal } from '@mui/material'

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
  isAuthUserGameTurn,
  isUserSeatedTable,
  isUserWaitingTable,
} from 'src/helpers/clientHelpersPoker'
import {
  CLIENT_CHANNELS,
  SERVER_CHANNELS,
  TABLE_PHASES,
  TABLE_TYPES,
} from 'src/configs/clientConstantsPoker'

export const ClientPoker = () => {
  const username = getLocalstorage(LOCAL_STORAGE_AUTH_USER_EMAIL)
  const [socket, setSocket] = useState<TypeSocket>(null)
  const [allTables, setAllTables] = useState<TypeTable[]>([])
  const [seatModal, setSeatModal] = useState<TypeSeatModal>({ tableId: 0, seatId: 0 })
  const [buyinAmount, setBuyinAmount] = useState<number>(0)

  const [raiseAmount, setRaiseAmount] = useState<number>(2)

  const userTables = useMemo(() => {
    return findUserTables(allTables, username)
  }, [allTables, username])

  useEffect(() => {
    if (!seatModal.tableId) return

    const min = userTables.find(t => t.id === seatModal.tableId)?.buyin.min || 0
    const max = userTables.find(t => t.id === seatModal.tableId)?.buyin.max || 0

    setBuyinAmount((max + min) / 2)
  }, [seatModal, userTables])

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
          // handleAutoJoinTable(tables, socketInstance)
        }
      },
    )

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  // const handleAutoJoinTable = useCallback(
  //   (tables: TypeTable[], socketInstance: TypeSocket) => {
  //     const userTables = findUserTables(tables, username)
  //     for (const userTable of userTables) {
  //       socketInstance.emit(CLIENT_CHANNELS.joinTable, { tableId: userTable.id, username })
  //     }
  //   },
  //   [username],
  // )

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

  const handleCheckAction = useCallback(
    (tableId: number) => {
      socket.emit(CLIENT_CHANNELS.checkAction, { tableId, username })
    },
    [socket, username],
  )

  const handleFoldAction = useCallback(
    (tableId: number) => {
      socket.emit(CLIENT_CHANNELS.foldAction, { tableId, username })
    },
    [socket, username],
  )

  const handleRaiseAction = useCallback(
    (tableId: number) => {
      socket.emit(CLIENT_CHANNELS.raiseAction, { tableId, username, raiseAmount })
    },
    [socket, username, raiseAmount],
  )

  return (
    <PageLayout>
      {!!seatModal.tableId && (
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
                onChange={(_, val) => setBuyinAmount(+val)}
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
                  image={allTable.type === TABLE_TYPES.holdem ? holdemImage : omahaImage}
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
                    <div className='home-runtable-main-body-tablecards'>
                      {userTable.cards.map((card, cardIndex) => {
                        const preflopPhase =
                          userTable.phase == TABLE_PHASES.wait ||
                          userTable.phase == TABLE_PHASES.preflop
                        const flopPhase = userTable.phase == TABLE_PHASES.flop || cardIndex > 2
                        const turnPhase = userTable.phase == TABLE_PHASES.turn || cardIndex > 3

                        if (preflopPhase || flopPhase || turnPhase) {
                          return null
                        }

                        return (
                          <div
                            key={card.type + card.number}
                            className='home-runtable-main-body-tablecards-card'
                          >
                            <b>{card.number}</b>
                            <img src={`/${card.type}.png`} alt={card.type} />
                          </div>
                        )
                      })}
                    </div>
                    {isAuthUserGameTurn(userTable, username) && (
                      <div className='home-runtable-main-body-actions'>
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={() => handleCheckAction(userTable.id)}
                        >
                          Check
                        </Button>
                        <Button
                          variant='text'
                          color='error'
                          size='small'
                          onClick={() => handleFoldAction(userTable.id)}
                        >
                          Fold
                        </Button>
                        <Button
                          variant='outlined'
                          color='success'
                          onClick={() => handleRaiseAction(userTable.id)}
                        >
                          RAISE
                        </Button>
                        <Slider
                          value={raiseAmount}
                          min={userTable.big}
                          step={userTable.big}
                          max={userTable.big * 5}
                          valueLabelFormat={val => '$' + val}
                          onChange={(_, val) => setRaiseAmount(+val)}
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
                              <img src={s.user.avatar} alt='Avatar' className='seat-user-avatar' />
                              <div className='seat-user-username'>{s.user.username}</div>
                              <div className='seat-user-cash'>${s.user.cash.inGame}</div>
                              <div className='seat-user-cards'>
                                {s.user.cards.map(card => {
                                  return (
                                    <div
                                      className='seat-user-cards-card'
                                      key={card.type + card.number}
                                    >
                                      <b>{card.number}</b>
                                      <img src={`/${card.type}.png`} alt={card.type} />
                                    </div>
                                  )
                                })}
                              </div>
                              {s.user.isDealer && (
                                <div className='seat-user-isdealer'>
                                  <img
                                    src='/dealer.png'
                                    alt='dealer'
                                    className='seat-user-isdealer-img'
                                  />
                                </div>
                              )}
                              {!!s.user.cash.inPot && (
                                <div className='seat-user-inpot'>${s.user.cash.inPot}</div>
                              )}
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
