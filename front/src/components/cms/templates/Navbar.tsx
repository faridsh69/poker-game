import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { AppBar, Box, IconButton, Button, Toolbar, Typography, MenuItem, Menu } from '@mui/material'

import { LanguageSwitcher } from 'src/components/cms/molecules/LanguageSwitcher'
import { ThemeSwitcher } from 'src/components/cms/molecules/ThemeSwitcher'
import { META_TAGS } from 'src/configs/constants'
import { useAuth } from 'src/hooks/useAuth'

export const Navbar = () => {
  const navigate = useNavigate()

  const { username, handleLogout } = useAuth()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position='static' sx={{ zIndex: 1201, height: '50px' }}>
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
        {!username && (
          <Button color='inherit' component={Link} to='/login'>
            Login
          </Button>
        )}
        {username && (
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
