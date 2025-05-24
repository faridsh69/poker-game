import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import LogoutIcon from '@mui/icons-material/Logout'
import { Box, Button, Container, Typography } from '@mui/material'

import classNames from 'classnames'
import { ImageLoader } from 'src/components/cms/molecules/ImageLoader'
import { Money } from 'src/components/game/molecules/Money/Money'
import { META_TAGS } from 'src/configs/constants'
import { ROUTES_PATH_NAMES } from 'src/configs/router'
import { GLOBAL_THEME } from 'src/configs/theme'
import { isLoggedin } from 'src/helpers/auth'
import { useAuth } from 'src/hooks/useAuth'
import UserAvatarsImage from 'src/images/game/avatars.png'
import BannerImage from 'src/images/game/banner2.png'
import LogoImage from 'src/images/game/logo2.png'
import { useCrudProfile } from 'src/services/hooks/useCrudProfile'

export const Header = () => {
  const { t } = useTranslation()
  const isLoggedinUser = isLoggedin()
  const { handleLogout } = useAuth()
  const { single: authUser } = useCrudProfile()

  return (
    <Container maxWidth='xl' component='header' className='main-header'>
      <ImageLoader
        src={LogoImage}
        alt='Royal-logo'
        height={35}
        width={153}
        loadingColor={GLOBAL_THEME.palette.secondary.dark}
      />
      <Typography component='small' sx={{ display: { xs: 'none', sm: 'block' } }}>
        {t('Welcome')} <b>{isLoggedinUser ? authUser?.username : ''}</b> {t('To')} {META_TAGS.title}
      </Typography>
      <ImageLoader
        src={BannerImage}
        alt='Banner'
        height={55}
        width={330}
        loadingColor={GLOBAL_THEME.palette.secondary.dark}
      />
      {!isLoggedinUser && (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <Button variant='outlined' size='small' component={Link} to={ROUTES_PATH_NAMES.login}>
            {t('Login')}
          </Button>
          <Button variant='outlined' size='small' component={Link} to={ROUTES_PATH_NAMES.register}>
            {t('Register')}
          </Button>
        </Box>
      )}

      {isLoggedinUser && (
        <div className='main-header-rightside'>
          <Link to={ROUTES_PATH_NAMES.profile} className='main-header-user'>
            <div className='main-header-user-avatar'>
              <div
                className={classNames('main-header-user-avatar-image', `avatar-${authUser?.avatar_id || 1}`)}
                style={{ backgroundImage: `url(${UserAvatarsImage})` }}
              />
            </div>
            <div className='main-header-user-balance'>
              {authUser?.first_name}: Balance <Money money={authUser?.balance ? +authUser?.balance : 0} />
            </div>
          </Link>
          <Button className='main-header-logout' onClick={handleLogout} sx={{ gap: 1 }}>
            <LogoutIcon />
          </Button>
        </div>
      )}
    </Container>
  )
}
