import classNames from 'classnames'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { SEAT_STATUS_DURATION } from 'src/configs/clientConstantsPoker'
import { lastActionAtom } from 'src/contexts/lastActionAtom'
import { TypeSeat } from 'src/interfaces'

export const SeatUserStatus = (props: { seat: TypeSeat; tableId: number }) => {
  const { seat, tableId } = props

  const [lastAction, setLastAction] = useAtom(lastActionAtom)

  useEffect(() => {
    setTimeout(() => {
      setLastAction(null)
    }, 500000)
  }, [lastAction, setLastAction])

  if (!lastAction || seat.user.username !== lastAction.username || tableId !== lastAction.tableId)
    return null

  return (
    <div className='dnd-window-body-table-seats-seat-user-status'>
      <div className={classNames('user-status-box', `user-status-box-${lastAction.action}`)}>
        {lastAction.action}
      </div>
    </div>
  )
}
