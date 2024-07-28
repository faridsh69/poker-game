import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { createTheme } from '@mui/material'
import { useAtom } from 'jotai'

import { LANGUAGES } from 'src/configs/locale'
import { THEMES } from 'src/configs/theme'
import { themeAtom } from 'src/contexts/themeAtom'
import { useInternetConnection } from 'src/hooks/useInternetConnection'

export const useThemeWithLocale = () => {
  const [theme] = useAtom(themeAtom)
  const { i18n } = useTranslation()

  const themeWithLocale = useMemo(() => {
    const currentLang = LANGUAGES.find(lang => lang.title === i18n.language) || LANGUAGES[0]

    return createTheme(THEMES[theme as string], currentLang.muiLocal)
  }, [i18n.language, theme])

  useInternetConnection()

  return themeWithLocale
}
