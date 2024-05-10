import { Link } from 'react-router-dom'
import { useRouteError } from 'react-router-dom'

import { Alert, AlertTitle } from '@mui/material'

import { META_TAGS } from 'src/configs/constants'
import { errorHandler } from 'src/helpers/errorHandler'
import ErrorImg from 'src/images/errors/500.png'

export const ErrorPage = () => {
  const error = useRouteError() as Error

  errorHandler(error, 'ErrorPage')

  return (
    <Alert severity='error'>
      <AlertTitle>Oops! {META_TAGS.title}</AlertTitle>
      <strong>
        <Link to='/'>Retry</Link>
      </strong>
      {/* @ts-ignore */}
      <pre>{error.message || error.name || error.data}</pre>
      <img src={ErrorImg} alt='error' />
    </Alert>
  )
}
