import { useTranslation } from 'react-i18next'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Avatar, Box, Container, Grid, Link, Typography } from '@mui/material'

import { FormMui } from 'src/components/cms/templates/FormMui'
import { PageLayout } from 'src/components/cms/templates/PageLayout'
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
              <Link href='/login' variant='body2'>
                {t('Already have an account? Login')}
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
export default Register
