import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import AccountCircle from '@mui/icons-material/AccountCircle'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LockResetIcon from '@mui/icons-material/LockReset'
// import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'

import { LanguageSwitcher } from 'src/components/cms/molecules/LanguageSwitcher'
import { ThemeSwitcher } from 'src/components/cms/molecules/ThemeSwitcher'
import { UnitSwitcher } from 'src/components/cms/molecules/UnitSwitcher'
import { META_TAGS } from 'src/configs/constants'
import { getAuthUsername, isLoggedin } from 'src/helpers/auth'
import { useAuth } from 'src/hooks/useAuth'

export const Navbar = () => {
  const navigate = useNavigate()

  const { handleLogout } = useAuth()
  const authUserUsername = getAuthUsername()

  const isLoggedinUser = isLoggedin()

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
        {/* <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='open drawer'
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant='h6' noWrap component='div' sx={{ display: { xs: 'none', sm: 'block' } }}>
          {META_TAGS.title} - {isLoggedinUser ? authUserUsername : 'Guest'}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <LanguageSwitcher />
        <UnitSwitcher />
        <ThemeSwitcher />
        {!isLoggedinUser && (
          <Button color='inherit' component={Link} to='/login'>
            Login
          </Button>
        )}
        {!isLoggedinUser && (
          <Button color='inherit' component={Link} to='/register'>
            Register
          </Button>
        )}
        {isLoggedinUser && (
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
          My profile
        </MenuItem>
        <MenuItem onClick={() => navigate('/admin/password')} sx={{ gap: 2 }}>
          <LockResetIcon />
          Reset password
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ gap: 2 }}>
          <LogoutIcon /> Logout
        </MenuItem>
      </Menu>
    </AppBar>
  )
}
