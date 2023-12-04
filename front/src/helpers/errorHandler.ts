import { toast } from 'react-toastify'

export const errorHandler = error => {
  toast.error(error)
}
