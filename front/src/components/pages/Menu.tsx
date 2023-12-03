// @xts-nocheck
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { Typography, Card, IconButton, CardMedia, CardContent, CardActions } from '@mui/material'

import { SkeletonBox } from 'src/components/organisms/SkeletonBox'
import { PageLayout } from 'src/components/templates/PageLayout'
import { useCrud } from 'src/hooks/useCrud'
import { useTranslation } from 'react-i18next'

export const Menu = () => {
  const tables = []

  const { t } = useTranslation()

  return (
    <PageLayout>
      <div className='menu'>
        {tables.length &&
          tables.map(table => {
            return (
              <div className='menu-category' key={table.id}>
                <div className='menu-category-seperator' />
                <div className='menu-category-foods'>
                  <Card className='menu-category-foods-food'>
                    <CardMedia
                      className='menu-category-foods-food-image'
                      component='img'
                      image={table['main-image']}
                      alt={t(table.title)}
                    />
                    <CardContent className='menu-category-foods-food-content'>
                      <Typography className='menu-category-foods-food-content-title'>
                        {t(table.title)}
                      </Typography>
                      <Typography className='menu-category-foods-food-content-description'>
                        {t(table.description)}
                      </Typography>
                      <Typography className='menu-category-foods-food-content-price'>
                        <span>€</span>
                        <b>{table.price}</b>
                        <span>99</span>
                      </Typography>
                      <CardActions className='menu-category-foods-food-content-actions'>
                        <IconButton aria-label='add to favorites'>
                          <FavoriteIcon fontSize='small' sx={{ color: 'rgb(233, 30, 99)' }} />
                        </IconButton>
                        <IconButton aria-label='share'>
                          <ShareIcon fontSize='small' color='primary' />
                        </IconButton>
                        <IconButton aria-label='plus'>
                          <AddShoppingCartIcon
                            fontSize='small'
                            sx={{ color: 'rgb(46, 125, 50)' }}
                          />
                        </IconButton>
                      </CardActions>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          })}
      </div>
    </PageLayout>
  )
}
