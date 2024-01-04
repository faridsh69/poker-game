import { Slider } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Money } from 'src/components/molecules/Money'
import { ActionButton } from './ActionButton'
import { getRaiseActionAmount, getRaiseLimits } from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import { useAtom } from 'jotai'
import { socketAtom } from 'src/contexts/socketAtom'
import { CLIENT_CHANNELS } from 'src/configs/clientConstantsPoker'
import { TypeTable } from 'src/interfaces'

export const RaiseButtons = (props: { table: TypeTable }) => {
  const { table } = props

  const { username } = useAuth()
  const [socket] = useAtom(socketAtom)

  const [raise, setRaise] = useState<number>(0)

  const raiseActionAmount = useMemo(() => {
    return getRaiseActionAmount(table, username, raise)
  }, [table, username, raise])

  const raiseLimits = useMemo(() => {
    return getRaiseLimits(table, username)
  }, [table, username])

  useEffect(() => {
    setRaise(raiseLimits.min)
  }, [raiseLimits.min])

  const handleRaiseAction = useCallback(() => {
    socket.emit(CLIENT_CHANNELS.raiseAction, {
      tableId: table.id,
      raiseActionAmount,
      username,
    })
  }, [socket, username, raiseActionAmount, table.id])

  const changeRaiseAmount = (price: number, percentPot: number = 0) => {
    let raise = percentPot ? percentPot * table.total : price
    raise = Math.max(raise, raiseLimits.min)
    raise = Math.min(raise, raiseLimits.max)

    setRaise(raise)
  }

  return (
    <>
      <div className='dnd-window-body-table-actions-gameturn-raisebuttons-percentactions'>
        <button onClick={() => changeRaiseAmount(0, 0.33)}>33%</button>
        <button onClick={() => changeRaiseAmount(0, 0.5)}>50%</button>
        <button onClick={() => changeRaiseAmount(0, 0.75)}>75%</button>
        <button onClick={() => changeRaiseAmount(0, 1)}>100%</button>
      </div>
      <div className='dnd-window-body-table-actions-gameturn-raisebuttons-price'>
        <Money money={raise} />
      </div>
      <Slider
        className='dnd-window-body-table-actions-gameturn-raisebuttons-slider'
        value={raise}
        min={raiseLimits.min}
        step={raiseLimits.step}
        max={raiseLimits.max}
        valueLabelFormat={val => '$' + val}
        onChange={(_, val) => setRaise(+val)}
        valueLabelDisplay='auto'
      />
      <ActionButton
        label={
          <div className='action-button-front-label'>
            <p className='action-button-front-label-p'>Raise to</p>
            <p className='action-button-front-label-p'>
              <Money money={raise} />
            </p>
          </div>
        }
        onClick={handleRaiseAction}
      />
    </>
  )
}
/* <CountDownTimer onFinishTimer={() => handleCheckAction(table.id)} />

       */
