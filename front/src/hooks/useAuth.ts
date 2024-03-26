import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { getLocalstorage, setLocalsotrage } from 'src/helpers/common'
import { LOCAL_STORAGE_AUTH_USER_EMAIL } from 'src/configs/constants'
import { postLogin, postRegister } from 'src/services/apis'
import { removeToken, setToken } from 'src/helpers/auth'

export const useAuth = () => {
  const navigate = useNavigate()
  const username = getLocalstorage(LOCAL_STORAGE_AUTH_USER_EMAIL)

  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (response, payload) => {
      // @ts-ignore
      setToken(response.access_token)
      navigate('/admin')
      toast.success('Logged in successfully!')
      // @ts-ignore
      setLocalsotrage(LOCAL_STORAGE_AUTH_USER_EMAIL, payload.username)
    },
  })

  const registerMutation = useMutation({
    mutationFn: postRegister,
    onSuccess: () => {
      toast.success('Registered successfully!')
    },
  })

  const handleLogout = useCallback(() => {
    removeToken()
    navigate('/login')
  }, [navigate])

  return {
    username,
    loginMutation,
    handleLogout,
    registerMutation,
  }
}
