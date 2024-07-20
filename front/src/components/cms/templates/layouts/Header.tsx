import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import LogoutIcon from '@mui/icons-material/Logout'
import { Box, Button, Container, Typography } from '@mui/material'

import { ImageLoader } from 'src/components/cms/molecules/ImageLoader'
import { Money } from 'src/components/game/molecules/Money/Money'
import { META_TAGS } from 'src/configs/constants'
import { ROUTES_PATH_NAMES } from 'src/configs/router'
import { globalTheme } from 'src/configs/theme'
import { isLoggedin } from 'src/helpers/auth'
import { useAuth } from 'src/hooks/useAuth'
import BannerImage from 'src/images/game/banner.png'
import LogoImage from 'src/images/game/logo.png'
import { useCrudProfile } from 'src/services/hooks/useCrudProfile'

export const Header = () => {
  const { t } = useTranslation()
  const isLoggedinUser = isLoggedin()
  const { handleLogout } = useAuth()
  const { single: authUser } = useCrudProfile()

  return (
    <Container maxWidth='xl' component='header'>
      <Box sx={{ mx: 4, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <ImageLoader
          src={LogoImage}
          alt='Royal-logo'
          height={140}
          width={140}
          loadingColor={globalTheme.palette.black.dark}
        />
        <Typography variant='h6' noWrap component='div' sx={{ display: { xs: 'none', sm: 'block' } }}>
          {t('Welcome')} <b>{isLoggedinUser ? authUser?.username : 'Guest'}</b> {t('To')} {META_TAGS.title}
        </Typography>
        <ImageLoader
          src={BannerImage}
          alt='Banner'
          height={55}
          width={330}
          loadingColor={globalTheme.palette.black.dark}
        />
        {!isLoggedinUser && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button variant='contained' component={Link} to={ROUTES_PATH_NAMES.login}>
              {t('Login')}
            </Button>
            <Button variant='contained' component={Link} to={ROUTES_PATH_NAMES.register}>
              {t('Register')}
            </Button>
          </Box>
        )}

        {isLoggedinUser && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button variant='contained' component={Link} to={ROUTES_PATH_NAMES.profile}>
              {authUser?.username} {t('Profile')}
            </Button>
            <Box sx={{ flexGrow: 1, p: 0, border: 1, bgcolor: 'background.paper', display: 'flex' }}>
              <div>
                Balance: <Money money={authUser?.balance ? +authUser?.balance : 0} />
              </div>
            </Box>
            <Button variant='contained' onClick={handleLogout} sx={{ gap: 1 }}>
              <LogoutIcon /> {t('Logout')}
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  )
}
