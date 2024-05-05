import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { ThemeProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { QueryClientProvider } from '@tanstack/react-query'

import { MetaTags } from 'src/components/cms/molecules/MetaTags'
import 'src/configs/locale'
import { Router } from 'src/configs/router'
import { REACT_QUERY_CLIENT } from 'src/configs/service'
import 'src/configs/styles'
import { TOASTER_OPTIONS } from 'src/configs/toaster'
import { useThemeWithLocale } from 'src/hooks/useThemeWithLocale'

export const App = () => {
  const themeWithLocale = useThemeWithLocale()
  return (
    <ThemeProvider theme={themeWithLocale}>
      <CssBaseline />
      <MetaTags />
      <ToastContainer {...TOASTER_OPTIONS} />
      <QueryClientProvider client={REACT_QUERY_CLIENT}>
        <RouterProvider router={Router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
