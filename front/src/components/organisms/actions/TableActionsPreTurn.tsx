import { Checkbox, FormControlLabel } from '@mui/material'
import {
  getCallActionAmount,
  isAtLeastTwoNotSeatOutPlayers,
  isAuthUserGameTurn,
  isUserSeatoutTable,
} from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { TypeTableProps } from 'src/interfaces'
import { useCallback, useMemo, useState } from 'react'
import { Money } from 'src/components/molecules/Money'

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
        <FormControlLabel
          control={
            <Checkbox
              checked={premoveChecked === 'check/fold'}
              onClick={() => handleChangeCheckbox('check/fold')}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<TaskAltIcon />}
            />
          }
          label='Check / Fold'
        />
        <FormControlLabel
          control={
            <Checkbox
              // checked={sitoutChecked === 'hand'}
              // onClick={() => handleChangeCheckbox('hand')}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<TaskAltIcon />}
            />
          }
          label='Check '
        />
      </div>
    )
  }

  return (
    <div className='dnd-window-body-table-actions-preturn'>
      <FormControlLabel
        control={
          <Checkbox
            // checked={sitoutChecked === 'hand'}
            // onClick={() => handleChangeCheckbox('hand')}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<TaskAltIcon />}
          />
        }
        label='Fold'
      />
      <FormControlLabel
        control={
          <Checkbox
            // checked={sitoutChecked === 'hand'}
            // onClick={() => handleChangeCheckbox('hand')}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<TaskAltIcon />}
          />
        }
        label={
          <div>
            Call <Money money={callActionAmount} />
          </div>
        }
      />
    </div>
  )
}
