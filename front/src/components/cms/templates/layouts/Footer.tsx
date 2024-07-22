import { AppBar, Box, Container } from '@mui/material'

import { LanguageSwitcher } from 'src/components/cms/molecules/LanguageSwitcher'
import { ThemeSwitcher } from 'src/components/cms/molecules/ThemeSwitcher'
import { UnitSwitcher } from 'src/components/cms/molecules/UnitSwitcher'

export const Footer = () => {
  return (
    <AppBar position='static' component='footer' className='nav-bar'>
      <Container maxWidth='xl'>
        <Box sx={{ mx: 4, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <LanguageSwitcher />
          <UnitSwitcher />
          <ThemeSwitcher />
        </Box>
      </Container>
    </AppBar>
  )
}
