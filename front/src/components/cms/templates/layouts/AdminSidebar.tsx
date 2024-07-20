import { useNavigate } from 'react-router-dom'

import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'

import { ADMIN_SIDEBAR_ITEMS } from 'src/configs/constants'
import { toFormalCase } from 'src/helpers/common'
import { useToggle } from 'src/hooks/useToggle'
import { TypeSidebarItem } from 'src/interfaces'

export const AdminSidebar = (props: { drawerWidth: number }) => {
  const { drawerWidth } = props

  const navigate = useNavigate()

  const handleNavigate = (item: TypeSidebarItem) => {
    navigate(item.url || item.title)
  }

  const [mobileOpen, handleDrawerToggle] = useToggle(false)

  const drawer = (
    <>
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
    </>
  )

  return (
    <Box sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        // container={container}
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}
