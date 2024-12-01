import { useTranslation } from 'react-i18next'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { Avatar, Container, Typography } from '@mui/material'

import { FormMui } from 'src/components/cms/templates/FormMui'
import { Money } from 'src/components/game/molecules/Money/Money'
import { MODEL_FORMS_NAMES, PAYMENTS_GATEWAYS, PAYMENTS_STATUSES } from 'src/configs/forms'
import { getAuthId } from 'src/helpers/auth'
import { TypeModel } from 'src/interfaces'
import { useCrudPayment } from 'src/services/hooks/useCrudPayment'
import { useCrudProfile } from 'src/services/hooks/useCrudProfile'

export const WithdrawForm = () => {
  const { t } = useTranslation()
  const authId = getAuthId()
  const { single: authUser } = useCrudProfile()

  const { createMutation } = useCrudPayment()

  const onSubmit = (data: TypeModel) => {
    createMutation.mutate({
      user_id: authId,
      status: PAYMENTS_STATUSES[0],
      price: data.price,
      user_giving: false,
      description: data.description,
      gateway: data.gateway,
      wallet: data.wallet,
    })
  }

  const defaultValues = { gateway: PAYMENTS_GATEWAYS[1], description: 'withdraw userid: ' + authId, wallet: 'Default' }

  return (
    <Container maxWidth='xs'>
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <AttachMoneyIcon />
      </Avatar>
      <Typography component='h5' variant='h5'>
        {t('Withdraw')}
      </Typography>

      <Typography sx={{ textAlign: 'center' }}>
        Available for withdraw
        <br />
        <Money money={authUser?.balance ? +authUser?.balance : 0} />
      </Typography>

      <FormMui
        formName={MODEL_FORMS_NAMES.withdraw}
        values={defaultValues}
        onSubmit={onSubmit}
        submitText={'Withdraw'}
        isUpdating={false}
      />
    </Container>
  )
}
