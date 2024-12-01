import { DepositTable } from '../tables/DepositTable'
import { PageLayout } from '../templates/layouts/PageLayout'
import { SocketLayout } from '../templates/layouts/SocketLayout'

import { DepositForm } from 'src/components/cms/forms/DepositForm'

export const Deposit = () => {
  return (
    <PageLayout>
      <SocketLayout>
        <DepositForm />
        <DepositTable />
      </SocketLayout>
    </PageLayout>
  )
}

// eslint-disable-next-line import/no-default-export
export default Deposit
