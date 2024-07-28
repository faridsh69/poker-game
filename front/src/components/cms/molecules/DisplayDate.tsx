import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Typography } from '@mui/material'

import { LANGUAGES } from 'src/configs/locale'

export const DisplayDate = () => {
  const { i18n } = useTranslation()

  const currentLang = useMemo(() => {
    return LANGUAGES.find(lang => lang.title === i18n.language) || LANGUAGES[0]
  }, [LANGUAGES, i18n.language])

  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }

  // @ts-ignore
  const finalDate = new Date().toLocaleString(currentLang.country, options)

  return (
    <Box>
      <Typography variant='subtitle1'>{finalDate}</Typography>
    </Box>
  )
}
