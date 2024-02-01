import { useState } from 'react'
import { CheckboxAction } from './details/CheckboxAction'
import { TypeTableProps } from 'src/interfaces'
import { useAuth } from 'src/hooks/useAuth'
import { getUserSeat, isUserSeatoutTable } from 'src/helpers/clientHelpersPoker'

export const TableActionsJoinPlay = (props: TypeTableProps) => {
  const { table } = props

  const { username } = useAuth()
  const authSeat = getUserSeat(table, username)

  const [waitForBb, setWaitForBb] = useState<boolean>(true)

  const handleChangeWaitForBb = (checked: boolean) => {
    setWaitForBb(!checked)
  }

  if (!authSeat) return null
  if (isUserSeatoutTable(table, username)) return null
  if (authSeat?.user.cards.length) return null

  return (
    <div className='dnd-window-body-table-actions-joinplay'>
      <CheckboxAction
        label='Wait for Big Blind'
        checked={waitForBb}
        onClick={() => handleChangeWaitForBb(waitForBb)}
      />
    </div>
  )
}
