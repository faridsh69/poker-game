import { useTranslation } from 'react-i18next'

import { PageLayout } from '../templates/layouts/PageLayout'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { Avatar, Container, Typography } from '@mui/material'

import { Loading } from 'src/components/cms/molecules/Loading'
import { FormMui } from 'src/components/cms/templates/FormMui'
import { MODEL_FORMS_NAMES } from 'src/configs/forms'
import { TypeModel } from 'src/interfaces'
import { useCrudProfile } from 'src/services/hooks/useCrudProfile'

const UserProfile = () => {
  const { t } = useTranslation()

  const { single: authUser, updateMutation } = useCrudProfile()

  const onSubmit = (data: TypeModel) => {
    delete data.password
    updateMutation.mutate(data)
  }

  if (!authUser) return <Loading />

  return (
    <PageLayout>
      <Container maxWidth='xs'>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <AccountBoxIcon />
        </Avatar>
        <Typography component='h5' variant='h5'>
          {t('Profile')}
        </Typography>
        <FormMui
          formName={MODEL_FORMS_NAMES.profile}
          values={authUser}
          onSubmit={onSubmit}
          submitText='Update Profile'
          isUpdating={true}
        />
      </Container>
    </PageLayout>
  )
}

// eslint-disable-next-line import/no-default-export
export default UserProfile
