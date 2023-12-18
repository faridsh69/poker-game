import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAtom } from 'jotai'
import { Button, Slider } from '@mui/material'

import {
  getCallActionAmount,
  isAuthUserGameTurn,
  isUserSeatoutTable,
} from 'src/helpers/clientHelpersPoker'
import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'
import { TypeTable } from 'src/interfaces/type-game'
import { CountDownTimer } from 'src/components/molecules/CountDownTimer'
import { useAuth } from 'src/hooks/useAuth'
import { socketAtom } from 'src/contexts/socketAtom'
import { TableActionsJoinGame } from '../actions/TableActionsJoinGame'

export const TableActions = (props: { table: TypeTable }) => {
  const { table } = props

  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)

  const [raiseActionAmount, setRaiseActionAmount] = useState<number>(0)
  const [raiseLimits, setRaiseLimits] = useState({
    min: 0,
    max: 0,
    step: 1,
  })

  const callActionAmount = useMemo(() => {
    return getCallActionAmount(table, username)
  }, [table, username])

  useEffect(() => {
    const raiseStep = callActionAmount || table.big
    const raiseMin = 2 * callActionAmount || table.big
    setRaiseLimits({
      min: raiseMin,
      max: raiseStep * 10,
      step: raiseStep,
    })
    setRaiseActionAmount(raiseMin)
  }, [callActionAmount, table.big])

  const handleCheckAction = useCallback(
    (tableId: number) => {
      // @TODO check if user is able to do check let him do check action
      // socket.emit(CLIENT_CHANNELS.checkAction, { tableId, username })
    },
    [socket, username],
  )

  const handleCallAction = useCallback(
    (tableId: number, callActionAmount: number) => {
      socket.emit(CLIENT_CHANNELS.callAction, { tableId, callActionAmount, username })
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
    (tableId: number, raiseActionAmount: number) => {
      socket.emit(CLIENT_CHANNELS.raiseAction, { tableId, raiseActionAmount, username })
    },
    [socket, username],
  )

  // const handleLeaveSeat = useCallback(
  //   (tableId: number) => {
  //     socket.emit(CLIENT_CHANNELS.leaveSeat, { tableId, username })
  //   },
  //   [socket, username],
  // )

  // const handleLeaveGame = useCallback(
  //   (tableId: number) => {
  //     socket.emit(CLIENT_CHANNELS.leaveGame, { tableId, username })
  //   },
  //   [socket, username],
  // )

  // if (!isAuthUserGameTurn(table, username)) return null

  const authUserSeatoutTable = isUserSeatoutTable(table, username)

  return (
    <div className='dnd-window-body-table-actions'>
      {authUserSeatoutTable && <TableActionsJoinGame table={table} />}

      <CountDownTimer onFinishTimer={() => handleCheckAction(table.id)} />
      {!callActionAmount && (
        <Button variant='contained' color='primary' onClick={() => handleCheckAction(table.id)}>
          Check
        </Button>
      )}
      {!!callActionAmount && (
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleCallAction(table.id, callActionAmount)}
        >
          Call {callActionAmount}$
        </Button>
      )}
      <Button variant='text' color='error' size='small' onClick={() => handleFoldAction(table.id)}>
        Fold
      </Button>
      <Button
        variant='outlined'
        color='success'
        onClick={() => handleRaiseAction(table.id, raiseActionAmount)}
      >
        RAISE {raiseActionAmount}$
      </Button>
      {/* <Slider
        value={raiseActionAmount}
        min={raiseLimits.min}
        step={raiseLimits.step}
        max={raiseLimits.max}
        valueLabelFormat={val => '$' + val}
        onChange={(_, val) => setRaiseActionAmount(+val)}
        valueLabelDisplay='auto'
      /> */}
    </div>
  )
}
