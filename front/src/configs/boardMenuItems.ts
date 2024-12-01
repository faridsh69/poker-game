import { DepositForm } from 'src/components/cms/forms/DepositForm'
import { WithdrawForm } from 'src/components/cms/forms/WithdrawForm'
import { TransferForm } from 'src/components/game/templates/payments/TransferForm'
import { TablesList } from 'src/components/game/templates/table/TablesList'

export const BOARD_MENU_ITEMS = [
  {
    label: 'Tables',
    component: TablesList,
  },
  {
    label: 'Deposit',
    component: DepositForm,
  },
  {
    label: 'Withdraw',
    component: WithdrawForm,
  },
  {
    label: 'Transfer',
    component: TransferForm,
  },
  // {
  //   label: 'Reward',
  //   component: RewardForm,
  // },
  // {
  //   label: 'Rake back',
  //   component: RakebackForm,
  // },
  // {
  //   label: 'Bonus code',
  //   component: BonuscodeForm,
  // },
]
