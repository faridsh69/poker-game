import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { PageLayout } from '../templates/layouts/PageLayout'
import LockResetIcon from '@mui/icons-material/LockReset'
import { Avatar, Container, Typography } from '@mui/material'

import { Loading } from 'src/components/cms/molecules/Loading'
import { FormMui } from 'src/components/cms/templates/FormMui'
import { MODEL_FORMS_NAMES } from 'src/configs/forms'
import { TypeModel } from 'src/interfaces'
import { useCrudPassword } from 'src/services/hooks/useCrudPassword'

const UserPassword = () => {
  const { t } = useTranslation()

  const { single: authUser, updateMutation } = useCrudPassword()

  const onSubmit = useCallback((data: TypeModel) => {
    updateMutation.mutate(data)
  }, [])

  if (!authUser) return <Loading />

  return (
    <PageLayout>
      <Container maxWidth='xs'>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockResetIcon />
        </Avatar>
        <Typography component='h5' variant='h5'>
          {t('Forget Password')}
        </Typography>
        <FormMui
          formName={MODEL_FORMS_NAMES.password}
          values={{ id: authUser.id }}
          onSubmit={onSubmit}
          submitText={'Update password'}
          isUpdating={true}
        />
      </Container>
    </PageLayout>
  )
}

// eslint-disable-next-line import/no-default-export
export default UserPassword
