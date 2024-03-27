import { useTranslation } from 'react-i18next'
import { Container, Avatar, Box, Grid, Link, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { OAUTH_API_INFO } from 'src/configs/constants'
import { useAuth } from 'src/hooks/useAuth'
import { PageLayout } from 'src/components/molecules/PageLayout'
import { FormMui } from 'src/components/organisms/admin/FormMui'
import { MODEL_FORMS_NAMES } from 'src/configs/forms'
import { getFormInputs, getFormSchema } from 'src/helpers/forms'
import { TypeModel } from 'src/interfaces'

export const Login = () => {
  const { t } = useTranslation()

  const { loginMutation } = useAuth()

  const onSubmit = (data: TypeModel) => {
    loginMutation.mutate({
      username: data.email,
      password: data.password,
      ...OAUTH_API_INFO,
    })
  }

  return (
    <PageLayout>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {t('Sign in')}
          </Typography>
          <FormMui
            inputs={getFormInputs(MODEL_FORMS_NAMES.login)}
            schema={getFormSchema(MODEL_FORMS_NAMES.login)}
            values={{}}
            onSubmit={onSubmit}
            submitText={t('Sign In')}
          />
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                {t('Forgot password?')}
              </Link>
            </Grid>
            <Grid item>
              <Link href='/register' variant='body2'>
                {t('dont have an account')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </PageLayout>
  )
}

export default Login
