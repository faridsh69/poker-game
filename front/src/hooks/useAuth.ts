import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useMutation } from '@tanstack/react-query'

import { removeAccessToken, setAccessToken } from 'src/helpers/auth'
import { postLogin, postRegister } from 'src/services/apis'

export const useAuth = () => {
  const navigate = useNavigate()

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
    loginMutation,
    registerMutation,
    handleLogout,
  }
}
