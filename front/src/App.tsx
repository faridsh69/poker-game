import { ToastContainer } from 'react-toastify'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@emotion/react'

import { REACT_QUERY_CLIENT } from 'src/configs/service'
import { Router } from 'src/configs/router'
import { MetaTags } from 'src/components/molecules/MetaTags'
import { TOASTER_OPTIONS } from 'src/configs/toaster'
import { useThemeWithLocale } from 'src/hooks/useThemeWithLocale'
import 'src/configs/locale'
import 'src/configs/styles'

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
