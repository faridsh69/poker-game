import { LoginForm } from '../forms/LoginForm'

import { PageLayout } from 'src/components/cms/templates/layouts/PageLayout'

export const Login = () => {
  return (
    <PageLayout>
      <LoginForm />
    </PageLayout>
  )
}

// eslint-disable-next-line import/no-default-export
export default Login
