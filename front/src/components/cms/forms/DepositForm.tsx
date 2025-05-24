import { useTranslation } from 'react-i18next'

import AddCardIcon from '@mui/icons-material/AddCard'
import { Avatar, Container, Typography } from '@mui/material'

import { FormMui } from 'src/components/cms/templates/FormMui'
import { MODEL_FORMS_NAMES, PAYMENTS_GATEWAYS, PAYMENTS_STATUSES } from 'src/configs/forms'
import { getAuthId } from 'src/helpers/auth'
import { TypeModel } from 'src/interfaces'
import { useCrudPayment } from 'src/services/hooks/useCrudPayment'

export const DepositForm = () => {
  const { t } = useTranslation()
  const authId = getAuthId()
  const { createMutation } = useCrudPayment()

  const onSubmit = (data: TypeModel) => {
    createMutation.mutate({
      user_id: authId,
      status: PAYMENTS_STATUSES[0],
      price: data.price,
      user_giving: true,
      description: data.description,
      gateway: data.gateway,
      wallet: data.wallet,
    })
  }

  const defaultValues = { gateway: PAYMENTS_GATEWAYS[1], description: 'will pay by crypto', wallet: 'Default' }

  return (
    <Container maxWidth='xs'>
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <AddCardIcon />
      </Avatar>
      <Typography component='h5' variant='h5'>
        {t('Deposit')}
      </Typography>

      <FormMui
        formName={MODEL_FORMS_NAMES.deposit}
        values={defaultValues}
        onSubmit={onSubmit}
        submitText={'Deposit'}
        isUpdating={false}
      />
    </Container>
  )
}
