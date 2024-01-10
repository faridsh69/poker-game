import { useCallback, useMemo, useState } from 'react'

import {
  getCallActionAmount,
  isAtLeastTwoNotSeatOutPlayers,
  isAuthUserGameTurn,
  isUserSeatoutTable,
} from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import { TypeTableProps } from 'src/interfaces'
import { Money } from 'src/components/molecules/Money'
import { CheckboxAction } from './details/CheckboxAction'

export const TableActionsPreTurn = (props: TypeTableProps) => {
  const { table } = props

  const { username } = useAuth()

  const [premoveChecked, setPremoveChecked] = useState<string>('')

  const handleChangeCheckbox = useCallback(
    (sitout: string) => {
      setPremoveChecked(premoveChecked === sitout ? '' : sitout)
    },
    [premoveChecked],
  )

  const callActionAmount = useMemo(() => {
    return getCallActionAmount(table, username)
  }, [table, username])

  if (!isAtLeastTwoNotSeatOutPlayers(table)) return null
  if (isUserSeatoutTable(table, username)) return null
  if (isAuthUserGameTurn(table, username)) return null

  if (!callActionAmount) {
    return (
      <div className='dnd-window-body-table-actions-preturn'>
        <CheckboxAction
          label='Check / Fold'
          checked={premoveChecked === 'Check / Fold'}
          onClick={() => handleChangeCheckbox('Check / Fold')}
        />
        <CheckboxAction
          label='Check'
          checked={premoveChecked === 'Check'}
          onClick={() => handleChangeCheckbox('Check')}
        />
      </div>
    )
  }

  return (
    <div className='dnd-window-body-table-actions-preturn'>
      <CheckboxAction
        label='Fold'
        checked={premoveChecked === 'Fold'}
        onClick={() => handleChangeCheckbox('Fold')}
      />
      <CheckboxAction
        label={
          <div>
            Call <Money money={callActionAmount} />
          </div>
        }
        checked={premoveChecked === 'Call'}
        onClick={() => handleChangeCheckbox('Call')}
      />
    </div>
  )
}
