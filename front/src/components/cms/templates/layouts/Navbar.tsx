import { AppBar, Box, Button, Container } from '@mui/material'

export const Navbar = () => {
  const NAVBAR_MENU_ITEMS = [
    {
      title: 'home',
    },
    {
      title: 'Lobby (holdem + omaha + tournoments)',
    },
    {
      title: 'My profile',
    },
    {
      title: 'Cashier',
    },
    {
      title: 'Ranking',
    },
    {
      title: 'Bunoses',
    },
    {
      title: 'Rake back',
    },
    {
      title: 'Settings',
    },
  ]

  return (
    <AppBar position='static' component='nav' className='nav-bar'>
      <Container maxWidth='xl'>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0 }}>
          {NAVBAR_MENU_ITEMS.map(menuItem => (
            <Button key={menuItem.title} className='nav-bar-button'>
              {menuItem.title}
            </Button>
          ))}
        </Box>
      </Container>
    </AppBar>
  )
}
