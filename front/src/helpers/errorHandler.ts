import { toast } from 'react-toastify'

export const errorHandler = (error: Error, source = 'no-source'): boolean => {
  // eslint-disable-next-line no-console
  console.warn('source', source)
  // eslint-disable-next-line no-console
  console.error('errorHandler error', error)
  toast.error(error.message)

  return false
}
