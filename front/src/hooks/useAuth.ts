import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { postLogin, postRegister } from 'src/services/apis'
import { getAuthUsername, removeAccessToken, setAccessToken } from 'src/helpers/auth'

export const useAuth = () => {
  const navigate = useNavigate()

  const username = getAuthUsername()

  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: response => {
      const loginResponse = response.data
      setAccessToken(loginResponse)
      toast.success('Logged in successfully!')

      navigate('/admin')
    },
  })

  const registerMutation = useMutation({
    mutationFn: postRegister,
    onSuccess: () => {
      toast.success('Registered successfully, please confirm your email and login.')

      navigate('/login')
    },
  })

  const handleLogout = useCallback(() => {
    removeAccessToken()
    navigate('/login')
  }, [navigate])

  return {
    username,
    loginMutation,
    handleLogout,
    registerMutation,
  }
}
