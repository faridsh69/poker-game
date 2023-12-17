import { Link } from 'react-router-dom'
import { useRouteError } from 'react-router-dom'
import { errorHandler } from 'src/helpers/errorHandler'
import { Alert, AlertTitle } from '@mui/material'
import ErrorImg from 'src/images/errors/500.png'
import { META_TAGS } from 'src/configs/constants'

export const ErrorPage = () => {
  const error = useRouteError()

  errorHandler(error)

  return (
    <Alert severity='error'>
      <AlertTitle>Oops! {META_TAGS.title}</AlertTitle>
      <strong>
        <Link to='/'>Retry</Link>
      </strong>
      <pre>{error.statusText || error.message}</pre>
      <img src={ErrorImg} alt='error' />
    </Alert>
  )
}
