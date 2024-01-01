import classNames from 'classnames'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { SEAT_STATUS_DURATION } from 'src/configs/clientConstantsPoker'
import { lastActionAtom } from 'src/contexts/lastActionAtom'
import { TypeSeat } from 'src/interfaces'

export const SeatUserStatus = (props: { seat: TypeSeat; tableId: number }) => {
  const { seat, tableId } = props

  const [lastAction] = useAtom(lastActionAtom)
  const [userLastAction, setUserLastAction] = useState('')

  useEffect(() => {
    if (!lastAction || seat.user.username !== lastAction.username || tableId !== lastAction.tableId)
      return

    setUserLastAction(lastAction.action)

    setTimeout(() => {
      setUserLastAction('')
    }, SEAT_STATUS_DURATION)
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
