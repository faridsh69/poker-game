import { useTranslation } from 'react-i18next'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Avatar, Box, Container, Grid, Link, Typography } from '@mui/material'

import { FormMui } from 'src/components/cms/templates/FormMui'
import { PageLayout } from 'src/components/cms/templates/PageLayout'
import { MODEL_FORMS_NAMES } from 'src/configs/forms'
import { getFormInputs, getFormSchema } from 'src/helpers/forms'
import { useAuth } from 'src/hooks/useAuth'
import { TypeModel } from 'src/interfaces'

export const Login = () => {
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
            {t('Login')}
          </Typography>
          <FormMui
            inputs={getFormInputs(MODEL_FORMS_NAMES.login)}
            schema={getFormSchema(MODEL_FORMS_NAMES.login)}
            values={{}}
            onSubmit={onSubmit}
            submitText={t('Login')}
            isUpdating={false}
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
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Box>
      </Container>
    </PageLayout>
  )
}

// eslint-disable-next-line import/no-default-export
export default Login
