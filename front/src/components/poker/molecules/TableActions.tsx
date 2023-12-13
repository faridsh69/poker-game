import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Slider } from '@mui/material'

import { getCallActionAmount, isAuthUserGameTurn } from 'src/helpers/clientHelpersPoker'
import { CountDownTimer } from 'src/components/poker/atoms/CountDownTimer'
import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'
import { TypeSocket, TypeTable } from 'src/interfaces/type-game'

export const TableActions = (props: { table: TypeTable; username: string; socket: TypeSocket }) => {
  const { table, username, socket } = props

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
      socket.emit(CLIENT_CHANNELS.checkAction, { tableId, username })
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

  if (!isAuthUserGameTurn(table, username)) return null

  return (
    <div className='home-runtable-main-body-actions'>
      {/* <CountDownTimer onFinishTimer={() => handleCheckAction(table.id)} /> */}
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
      <Slider
        value={raiseActionAmount}
        min={raiseLimits.min}
        step={raiseLimits.step}
        max={raiseLimits.max}
        valueLabelFormat={val => '$' + val}
        onChange={(_, val) => setRaiseActionAmount(+val)}
        valueLabelDisplay='auto'
      />
    </div>
  )
}
