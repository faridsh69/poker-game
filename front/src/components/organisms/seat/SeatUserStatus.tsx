import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useAtom } from 'jotai'

import { SEAT_STATUS_DURATION_MILLISECOND } from 'src/configs/clientConstantsPoker'
import { lastActionAtom } from 'src/contexts/lastActionAtom'
import { TypeSeat } from 'src/interfaces'

export const SeatUserStatus = (props: { seat: TypeSeat; tableId: number }) => {
  const { seat, tableId } = props

  const [lastAction] = useAtom(lastActionAtom)
  const [userLastAction, setUserLastAction] = useState('')

  const [raiseSound] = useState(new Audio('/sounds/raise-sound.mp3'))
  const [checkSound] = useState(new Audio('/sounds/check-sound.mp3'))
  const [callsound] = useState(new Audio('/sounds/call-sound.mp3'))
  const [foldSound] = useState(new Audio('/sounds/fold-sound.mp3'))
  const [allinSound] = useState(new Audio('/sounds/allin-sound.mp3'))

  useEffect(() => {
    if (!lastAction || seat.user.username !== lastAction.username || tableId !== lastAction.tableId)
      return

    setUserLastAction(lastAction.action)

    if (lastAction.action === 'Call') {
      callsound.play()
    }
    if (lastAction.action === 'Check') {
      checkSound.play()
    }
    if (lastAction.action === 'Raise') {
      raiseSound.play()
    }
    if (lastAction.action === 'Fold') {
      foldSound.play()
    }
    if (lastAction.action === 'All-In') {
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
