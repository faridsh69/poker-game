import { useLocation, useNavigate } from 'react-router-dom'

import { ImageLoader } from '../../molecules/ImageLoader'
import { AppBar, Button, Container } from '@mui/material'

import classNames from 'classnames'
import { NAVBAR_MENU_ITEMS } from 'src/configs/constants'

export const Navbar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleNavigate = (pathname: string) =>
    navigate({
      pathname,
    })

  return (
    <AppBar position='static' className='main-nav'>
      <Container maxWidth='xl'>
        {NAVBAR_MENU_ITEMS.map(menuItem => {
          return (
            <Button
              key={menuItem.path}
              className={classNames('main-nav-btn', pathname === menuItem.path && 'main-nav-active')}
              onClick={() => handleNavigate(menuItem.path)}
            >
              <div className='main-nav-btn-text'>
                {menuItem.title && <span>{menuItem.title}</span>}
                {menuItem.icon}
                {menuItem.image && <ImageLoader src={menuItem.image} height={40} />}
              </div>
            </Button>
          )
        })}
      </Container>
    </AppBar>
  )
}
