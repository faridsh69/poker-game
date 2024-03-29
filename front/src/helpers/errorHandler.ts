import { toast } from 'react-toastify'

export const errorHandler = (error: Error): boolean => {
  console.log('errorHandler error', error)
  toast.error(error.message)

  return false
}
