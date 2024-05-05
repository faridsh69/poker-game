import { CallAction } from './details/CallAction'
import { CheckAction } from './details/CheckAction'

import { TypeTableProps } from 'src/interfaces'

export const CallOrCheckAction = (props: TypeTableProps & { callActionAmount: number }) => {
  const { table, callActionAmount } = props

  if (!callActionAmount) {
    return <CheckAction table={table} />
  }

  return <CallAction table={table} callActionAmount={callActionAmount} />
}
