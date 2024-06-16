import { useEffect, useState } from 'react'

import { useAtom } from 'jotai'

import classNames from 'classnames'
import { CLIENT_TIMEOUT_STATUS } from 'src/configs/clientConstantsPoker'
import { lastActionAtom } from 'src/contexts/lastActionAtom'
import { checkIfLastActionIsAllIn } from 'src/helpers/clientHelpersPoker'
import { playSound } from 'src/helpers/common'
import { TypeSeat } from 'src/interfaces'

export const SeatUserStatus = (props: { seat: TypeSeat; tableId: number }) => {
  const { seat, tableId } = props

  const [serverLastAction] = useAtom(lastActionAtom)
  const [correctLastAction, setCorrectLastAction] = useState('')

  const showAction =
    serverLastAction && seat.user.username === serverLastAction.username && tableId === serverLastAction.tableId

  useEffect(() => {
    if (!showAction) return

    const correctAction = checkIfLastActionIsAllIn(serverLastAction.action, seat)
    setCorrectLastAction(correctAction)

    playSound(correctAction)

    setTimeout(() => {
      setCorrectLastAction('')
    }, CLIENT_TIMEOUT_STATUS * 1000)
  }, [showAction])

  if (!correctLastAction) return null

  return (
    <div className='popup-table-seats-seat-user-status'>
      <div className={classNames('user-status-box', `user-status-box-${correctLastAction}`)}>{correctLastAction}</div>
    </div>
  )
}
