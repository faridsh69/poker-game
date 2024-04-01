import { BonuscodeForm } from 'src/components/game/templates/payments/BonuscodeForm'
import { DepositForm } from 'src/components/game/templates/payments/DepositForm'
import { RakebackForm } from 'src/components/game/templates/payments/RakebackForm'
import { RewardForm } from 'src/components/game/templates/payments/RewardForm'
import { TransferForm } from 'src/components/game/templates/payments/TransferForm'
import { WithdrawForm } from 'src/components/game/templates/payments/WithdrawForm'
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
  {
    label: 'Reward',
    component: RewardForm,
  },
  {
    label: 'Rake back',
    component: RakebackForm,
  },
  {
    label: 'Bonus code',
    component: BonuscodeForm,
  },
]
