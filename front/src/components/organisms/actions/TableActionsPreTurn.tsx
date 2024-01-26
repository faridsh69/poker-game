import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  getCallActionAmount,
  isAtLeastTwoNotSeatOutPlayers,
  isUserGameTurn,
  isFinishPhase,
  isShowPhase,
  isUserHasCashInGame,
  isUserSeatoutTable,
  isWaitPhase,
} from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import { TypeTableProps } from 'src/interfaces'
import { Money } from 'src/components/molecules/Money'
import { CheckboxAction } from './details/CheckboxAction'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { PRE_MOVED_VALUES } from 'src/configs/clientConstantsPoker'

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

  const { handleCheckAction, handleFoldAction, handleCallAction } = useSocketActions(table.id)

  const callActionAmount = useMemo(() => {
    return getCallActionAmount(table, username)
  }, [table, username])

  const enableCheckboxes = useMemo(() => {
    const isWaitingOrShowPhase = isWaitPhase(table) || isShowPhase(table) || isFinishPhase(table)

    return (
      isAtLeastTwoNotSeatOutPlayers(table) &&
      isUserHasCashInGame(table, username) &&
      !isUserSeatoutTable(table, username) &&
      !isWaitingOrShowPhase
    )
  }, [table, username])

  const isAuthTurn = isUserGameTurn(table, username)

  const showCheckboxes = enableCheckboxes && !isAuthTurn
  const runCheckboxesAction = enableCheckboxes && isAuthTurn

  useEffect(() => {
    if (!runCheckboxesAction) return

    if (premoveChecked === PRE_MOVED_VALUES.fold) {
      handleFoldAction()
    }
    if (premoveChecked === PRE_MOVED_VALUES.call && callActionAmount) {
      handleCallAction(callActionAmount)
    }
    if (premoveChecked === PRE_MOVED_VALUES.check && !callActionAmount) {
      handleCheckAction()
    }

    if (premoveChecked === PRE_MOVED_VALUES.checkFold) {
      if (callActionAmount) {
        handleFoldAction()
      } else {
        handleCheckAction()
      }
    }
    handleChangeCheckbox('')
  }, [table])

  if (!showCheckboxes) return null

  if (!callActionAmount) {
    return (
      <div className='dnd-window-body-table-actions-preturn'>
        <CheckboxAction
          label={PRE_MOVED_VALUES.checkFold}
          checked={premoveChecked === PRE_MOVED_VALUES.checkFold}
          onClick={() => handleChangeCheckbox(PRE_MOVED_VALUES.checkFold)}
        />
        <CheckboxAction
          label={PRE_MOVED_VALUES.check}
          checked={premoveChecked === PRE_MOVED_VALUES.check}
          onClick={() => handleChangeCheckbox(PRE_MOVED_VALUES.check)}
        />
      </div>
    )
  }

  return (
    <div className='dnd-window-body-table-actions-preturn'>
      <CheckboxAction
        label={PRE_MOVED_VALUES.fold}
        checked={premoveChecked === PRE_MOVED_VALUES.fold}
        onClick={() => handleChangeCheckbox(PRE_MOVED_VALUES.fold)}
      />
      <CheckboxAction
        label={
          <div>
            ${PRE_MOVED_VALUES.call} <Money money={callActionAmount} />
          </div>
        }
        checked={premoveChecked === PRE_MOVED_VALUES.call}
        onClick={() => handleChangeCheckbox(PRE_MOVED_VALUES.call)}
      />
    </div>
  )
}
