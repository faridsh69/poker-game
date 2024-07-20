import { useTranslation } from 'react-i18next'

import HowToRegIcon from '@mui/icons-material/HowToReg'
import { Avatar, Container, Grid, Link, Typography } from '@mui/material'

import { FormMui } from 'src/components/cms/templates/FormMui'
import { PageLayout } from 'src/components/cms/templates/layouts/PageLayout'
import { MODEL_FORMS_NAMES } from 'src/configs/forms'
import { useAuth } from 'src/hooks/useAuth'
import { TypeModel } from 'src/interfaces'

export const Register = () => {
  const { t } = useTranslation()

  const { registerMutation } = useAuth()

  const onSubmit = (data: TypeModel) => {
    registerMutation.mutate({
      email: data.email,
      username: data.username,
      password: data.password,
    })
  }

  return (
    <PageLayout>
      <Container
        maxWidth='xs'
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <HowToRegIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {t('Register')}
        </Typography>
        <FormMui
          formName={MODEL_FORMS_NAMES.register}
          values={{}}
          onSubmit={onSubmit}
          submitText={t('Register')}
          isUpdating={false}
        />
        <Grid container>
          <Grid item pl={4}>
            <Link href='/login'>{t('Already have an account? Login')}</Link>
          </Grid>
        </Grid>
      </Container>
    </PageLayout>
  )
}

// eslint-disable-next-line import/no-default-export
export default Register
