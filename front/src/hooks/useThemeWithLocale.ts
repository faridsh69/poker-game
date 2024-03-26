import { useMemo } from 'react'
import { useAtom } from 'jotai'
import { createTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { themeAtom } from 'src/contexts/themeAtom'
import { useInternetConnection } from 'src/hooks/useInternetConnection'
import { THEMES } from 'src/configs/theme'
import { MUI_LOCALES } from 'src/configs/locale'

export const useThemeWithLocale = () => {
  const [theme] = useAtom(themeAtom)
  const { i18n } = useTranslation()

  const themeWithLocale = useMemo(
    // @ts-ignore
    () => createTheme(THEMES[theme], MUI_LOCALES[i18n.language]),
    [i18n.language, theme],
  )

  useInternetConnection()

  return themeWithLocale
}
