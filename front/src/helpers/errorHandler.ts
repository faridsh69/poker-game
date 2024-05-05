import { toast } from 'react-toastify'

export const errorHandler = (error: Error): boolean => {
  // eslint-disable-next-line no-console
  console.warn('errorHandler error', error)
  toast.error(error.message)

  return false
}
