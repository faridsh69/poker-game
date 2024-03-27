import { TypeTableProps } from 'src/interfaces'
import { CheckAction } from './details/CheckAction'
import { CallAction } from './details/CallAction'

export const CallOrCheckAction = (props: TypeTableProps & { callActionAmount: number }) => {
  const { table, callActionAmount } = props

  if (!callActionAmount) {
    return <CheckAction table={table} />
  }

  return <CallAction table={table} callActionAmount={callActionAmount} />
}
