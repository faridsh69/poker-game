import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useAtom } from 'jotai'

import { SEAT_STATUS_DURATION_MILLISECOND } from 'src/configs/clientConstantsPoker'
import { lastActionAtom } from 'src/contexts/lastActionAtom'
import { TypeSeat } from 'src/interfaces'
import { checkIfLastActionIsAllIn } from 'src/helpers/clientHelpersPoker'
import { playSound } from 'src/helpers/common'

export const SeatUserStatus = (props: { seat: TypeSeat; tableId: number }) => {
  const { seat, tableId } = props

  const [serverLastAction] = useAtom(lastActionAtom)
  const [correctLastAction, setCorrectLastAction] = useState('')

  const showAction =
    serverLastAction &&
    seat.user.username === serverLastAction.username &&
    tableId === serverLastAction.tableId

  useEffect(() => {
    if (!showAction) return

    const correctAction = checkIfLastActionIsAllIn(serverLastAction.action, seat)
    setCorrectLastAction(correctAction)

    playSound(correctAction)

    setTimeout(() => {
      setCorrectLastAction('')
    }, SEAT_STATUS_DURATION_MILLISECOND)
  }, [showAction])

  if (!correctLastAction) return null

  return (
    <div className='dnd-window-body-table-seats-seat-user-status'>
      <div className={classNames('user-status-box', `user-status-box-${correctLastAction}`)}>
        {correctLastAction}
      </div>
    </div>
  )
}
