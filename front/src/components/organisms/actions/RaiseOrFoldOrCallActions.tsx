import { TypeTableProps } from 'src/interfaces'
import { FoldAction } from 'src/components/organisms/actions/FoldAction'
import { CallOrCheckAction } from 'src/components/organisms/actions/CallOrCheckAction'
import { useRaiseActions } from 'src/hooks/useRaiseActions'
import { RaiseActionFirstRow } from 'src/components/organisms/actions/RaiseActionFirstRow'
import { RaiseAction } from 'src/components/organisms/actions/RaiseAction'

export const RaiseOrFoldOrCallActions = (props: TypeTableProps) => {
  const { table } = props

  const { raise, raiseLimits, changeRaiseAmount, handleRaiseAction } = useRaiseActions(table)

  return (
    <div className='dnd-window-body-table-actions-gameturn'>
      <RaiseActionFirstRow
        raise={raise}
        raiseLimits={raiseLimits}
        changeRaiseAmount={changeRaiseAmount}
      />
      <div className='dnd-window-body-table-actions-gameturn-secondrow'>
        <FoldAction table={table} />
        <CallOrCheckAction table={table} />
        <RaiseAction raise={raise} handleRaiseAction={handleRaiseAction} />
      </div>
    </div>
  )
}
/* <CountDownTimer onFinishTimer={() => handleCheckAction(table.id)} />*/
