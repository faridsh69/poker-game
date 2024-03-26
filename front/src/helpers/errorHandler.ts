import { toast } from 'react-toastify'

export const errorHandler = (error: Error): boolean => {
  toast.error(error.message)

  return false
}
