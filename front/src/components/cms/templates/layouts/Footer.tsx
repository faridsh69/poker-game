import { ConnectionDetector } from '../../molecules/ConnectionDetector'
import { DisplayDate } from '../../molecules/DisplayDate'
import { AppBar, Box, Container } from '@mui/material'

import { LanguageSwitcher } from 'src/components/cms/molecules/LanguageSwitcher'
import { ThemeSwitcher } from 'src/components/cms/molecules/ThemeSwitcher'
import { UnitSwitcher } from 'src/components/cms/molecules/UnitSwitcher'

export const Footer = () => {
  return (
    <AppBar position='fixed' component='footer' className='main-footer'>
      <Container maxWidth='xl'>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
          <ThemeSwitcher />
          <UnitSwitcher />
          <LanguageSwitcher />
          <ConnectionDetector />
          <DisplayDate />
        </Box>
      </Container>
    </AppBar>
  )
}
