import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Box, IconButton, Button, Toolbar, Typography, MenuItem, Menu } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useAuth } from 'src/hooks/useAuth'
import { getToken } from 'src/helpers/auth'
import { useState } from 'react'
import { ThemeSwitcher } from './ThemeSwitcher'
import { LanguageSwitcher } from './LanguageSwitcher'
import LogoutIcon from '@mui/icons-material/Logout'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { META_TAGS } from 'src/configs/constants'

export const Navbar = () => {
  const { username } = useAuth()
  const navigate = useNavigate()
  const { handleLogout } = useAuth()

  const accessToken = getToken()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar
      position='static'
      sx={{ zIndex: 1201, background: 'rgba(100, 100, 100, 0.2)', height: '50px' }}
    >
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='open drawer'
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant='h6'
          noWrap
          component='div'
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          {META_TAGS.title} - {username ? username : 'Guest'}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <LanguageSwitcher />
        <ThemeSwitcher />
        {!accessToken && (
          <Button color='inherit' component={Link} to='/login'>
            Login
          </Button>
        )}
        {accessToken && (
          <IconButton size='large' onClick={handleProfileMenuOpen} color='inherit'>
            <AccountCircle />
          </IconButton>
        )}
      </Toolbar>
      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ zIndex: 1201 }}
      >
        <MenuItem onClick={() => navigate('/admin')} sx={{ gap: 2 }}>
          <AdminPanelSettingsIcon />
          Admin
        </MenuItem>
        <MenuItem onClick={() => navigate('/admin/profile')} sx={{ gap: 2 }}>
          <ManageAccountsIcon />
          My Profile
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ gap: 2 }}>
          <LogoutIcon /> Logout
        </MenuItem>
      </Menu>
    </AppBar>
  )
}
