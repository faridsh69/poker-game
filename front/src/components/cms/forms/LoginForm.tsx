import { useTranslation } from 'react-i18next'

import LoginIcon from '@mui/icons-material/Login'
import { Avatar, Container, Grid, Link, Typography } from '@mui/material'

import { FormMui } from 'src/components/cms/templates/FormMui'
import { MODEL_FORMS_NAMES } from 'src/configs/forms'
import { useAuth } from 'src/hooks/useAuth'
import { TypeModel } from 'src/interfaces'

export const LoginForm = () => {
  const { t } = useTranslation()

  const { loginMutation } = useAuth()

  const onSubmit = (data: TypeModel) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
      remember: !!data.remember,
    })
  }

  return (
    <Container maxWidth='xs'>
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LoginIcon />
      </Avatar>
      <Typography component='h5' variant='h5'>
        {t('Login')}
      </Typography>
      <FormMui
        formName={MODEL_FORMS_NAMES.login}
        values={{}}
        onSubmit={onSubmit}
        submitText='Login'
        isUpdating={false}
      />
      <Grid container>
        <Grid item xs>
          <Link href='#'>{t('Forgot password?')}</Link>
        </Grid>
        <Grid item>
          <Link href='/register'>{t('dont have an account')}</Link>
        </Grid>
      </Grid>
    </Container>
  )
}
