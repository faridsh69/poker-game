import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

import { BOARD_MENU_ITEMS } from 'src/configs/boardMenuItems'

export const BoardTabs = () => {
  const [selectedItem, setSelectedItem] = React.useState(0)

  const handleChange = (_: React.SyntheticEvent, selectedItem: number) => {
    setSelectedItem(selectedItem)
  }

  return (
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
  )
}
