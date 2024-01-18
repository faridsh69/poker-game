import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useAtom } from 'jotai'

import {
  LAST_ACTION_ACTIONS,
  SEAT_STATUS_DURATION_MILLISECOND,
} from 'src/configs/clientConstantsPoker'
import { lastActionAtom } from 'src/contexts/lastActionAtom'
import { TypeSeat } from 'src/interfaces'

export const SeatUserStatus = (props: { seat: TypeSeat; tableId: number }) => {
  const { seat, tableId } = props

  const [lastAction] = useAtom(lastActionAtom)
  const [userLastAction, setUserLastAction] = useState('')

  const [checkSound] = useState(new Audio('/sounds/check.mp3'))
  const [callsound] = useState(new Audio('/sounds/call.mp3'))
  const [raiseSound] = useState(new Audio('/sounds/raise.mp3'))
  const [foldSound] = useState(new Audio('/sounds/fold.mp3'))
  const [allinSound] = useState(new Audio('/sounds/allin.mp3'))

  useEffect(() => {
    if (!lastAction || seat.user.username !== lastAction.username || tableId !== lastAction.tableId)
      return

    setUserLastAction(lastAction.action)

    if (lastAction.action === LAST_ACTION_ACTIONS.Call) {
      callsound.play()
    }
    if (lastAction.action === LAST_ACTION_ACTIONS.Check) {
      checkSound.play()
    }
    if (lastAction.action === LAST_ACTION_ACTIONS.Raise) {
      raiseSound.play()
    }
    if (lastAction.action === LAST_ACTION_ACTIONS.Fold) {
      foldSound.play()
    }
    if (lastAction.action === LAST_ACTION_ACTIONS['All-In']) {
      allinSound.play()
    }

    setTimeout(() => {
      setUserLastAction('')
    }, SEAT_STATUS_DURATION_MILLISECOND)
  }, [lastAction, tableId, seat.user.username])

  if (!userLastAction) return null

  return (
    <div className='dnd-window-body-table-seats-seat-user-status'>
      <div className={classNames('user-status-box', `user-status-box-${userLastAction}`)}>
        {userLastAction}
      </div>
    </div>
  )
}
