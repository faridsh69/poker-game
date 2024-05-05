import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { createTheme } from '@mui/material'
import { useAtom } from 'jotai'

import { MUI_LOCALES } from 'src/configs/locale'
import { THEMES } from 'src/configs/theme'
import { themeAtom } from 'src/contexts/themeAtom'
import { useInternetConnection } from 'src/hooks/useInternetConnection'

export const useThemeWithLocale = () => {
  const [theme] = useAtom(themeAtom)
  const { i18n } = useTranslation()

  const themeWithLocale = useMemo(
    () => createTheme(THEMES[theme as string], MUI_LOCALES[i18n.language]),
    [i18n.language, theme],
  )

  useInternetConnection()

  return themeWithLocale
}
