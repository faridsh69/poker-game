import { AppBar, Box, Button, Container, Toolbar } from '@mui/material'

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
    <AppBar position='static' component='nav'>
      <Container maxWidth='xl'>
        <Toolbar>
          <Box>
            {NAVBAR_MENU_ITEMS.map(menuItem => (
              <Button key={menuItem.title} sx={{ color: 'white' }}>
                {menuItem.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
