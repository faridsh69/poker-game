import { WithdrawTable } from '../tables/WithdrawTable'
import { PageLayout } from '../templates/layouts/PageLayout'
import { SocketLayout } from '../templates/layouts/SocketLayout'

import { WithdrawForm } from 'src/components/cms/forms/WithdrawForm'

export const Withdraw = () => {
  return (
    <PageLayout>
      <SocketLayout>
        <WithdrawForm />
        <WithdrawTable />
      </SocketLayout>
    </PageLayout>
  )
}

// eslint-disable-next-line import/no-default-export
export default Withdraw
