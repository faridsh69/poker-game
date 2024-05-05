import { SyntheticEvent, useState } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import { BOARD_MENU_ITEMS } from 'src/configs/boardMenuItems'
import { useAuth } from 'src/hooks/useAuth'

export const BoardTabs = () => {
  const { authUser } = useAuth()

  const [selectedItem, setSelectedItem] = useState(0)

  const handleChange = (_: SyntheticEvent, selectedItem: number) => {
    setSelectedItem(selectedItem)
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1, p: 2, border: 1, bgcolor: 'background.paper', display: 'flex' }}>
        <Typography>Balance: {authUser?.balance || 0}$</Typography>
      </Box>

      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={selectedItem}
          onChange={handleChange}
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {BOARD_MENU_ITEMS.map((item, itemIndex) => {
            return (
              <Tab
                key={item.label}
                label={item.label}
                id={`vertical-tab-${itemIndex}`}
                aria-controls={`vertical-tabpanel-${itemIndex}`}
              />
            )
          })}
        </Tabs>
        {BOARD_MENU_ITEMS.map((item, itemIndex) => {
          const MenuComponent = item.component

          return (
            <div
              key={item.label}
              role='tabpanel'
              hidden={selectedItem !== itemIndex}
              id={`vertical-tabpanel-${itemIndex}`}
              aria-labelledby={`vertical-tab-${itemIndex}`}
            >
              {selectedItem === itemIndex && <MenuComponent />}
            </div>
          )
        })}
      </Box>
    </div>
  )
}
