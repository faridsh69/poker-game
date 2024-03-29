import { useTranslation } from 'react-i18next'
import { Container, Avatar, Box, Grid, Link, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { useAuth } from 'src/hooks/useAuth'
import { PageLayout } from 'src/components/cms/templates/PageLayout'
import { FormMui } from 'src/components/cms/templates/FormMui'
import { MODEL_FORMS_NAMES } from 'src/configs/forms'
import { TypeModel } from 'src/interfaces'
import { getFormInputs, getFormSchema } from 'src/helpers/forms'

export const Register = () => {
  const { t } = useTranslation()

  const { registerMutation } = useAuth()

  const onSubmit = (data: TypeModel) => {
    registerMutation.mutate({
      username: data.email,
      password: data.password,
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
            {t('Sign up')}
          </Typography>
          <FormMui
            inputs={getFormInputs(MODEL_FORMS_NAMES.register)}
            schema={getFormSchema(MODEL_FORMS_NAMES.register)}
            values={{}}
            onSubmit={onSubmit}
            submitText={t('Sign up')}
          />
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                {t('Forgot password?')}
              </Link>
            </Grid>
            <Grid item>
              <Link href='/login' variant='body2'>
                {t('already have an account')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </PageLayout>
  )
}

export default Register
