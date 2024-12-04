import { useNavigate } from 'react-router-dom'

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'

import { ADMIN_SIDEBAR_ITEMS } from 'src/configs/constants'
import { toFormalCase } from 'src/helpers/common'
import { TypeSidebarItem } from 'src/interfaces'

export const AdminSidebar = () => {
  const navigate = useNavigate()

  const handleNavigate = (item: TypeSidebarItem) => {
    navigate(item.url || item.title)
  }

  return (
    <Drawer variant='permanent' className='admin-drawer'>
      <Toolbar />
      <List>
        {ADMIN_SIDEBAR_ITEMS.map(item => {
          const ItemIcon = item.icon

          return (
            <ListItem key={item.title} disablePadding>
              <ListItemButton onClick={() => handleNavigate(item)}>
                <ListItemIcon>
                  <ItemIcon />
                </ListItemIcon>
                <ListItemText primary={toFormalCase(item.title)} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  )
}
