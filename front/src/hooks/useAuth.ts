import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useMutation } from '@tanstack/react-query'

import { ROUTES_PATH_NAMES } from 'src/configs/router'
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

      navigate({
        pathname: ROUTES_PATH_NAMES.home,
      })
    },
  })

  const registerMutation = useMutation({
    mutationFn: postRegister,
    onSuccess: () => {
      toast.success('Registered successfully, please confirm your email and login.')

      navigate({
        pathname: ROUTES_PATH_NAMES.login,
      })
    },
  })

  const handleLogout = useCallback(() => {
    removeAccessToken()
    navigate({
      pathname: ROUTES_PATH_NAMES.login,
    })
  }, [navigate])

  return {
    loginMutation,
    registerMutation,
    handleLogout,
  }
}
