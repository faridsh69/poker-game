import { SyntheticEvent, useEffect, useState } from 'react'

import { Money } from '../../molecules/Money'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import { BOARD_MENU_ITEMS } from 'src/configs/boardMenuItems'
import { REACT_QUERY_CLIENT } from 'src/configs/service'
import { getAuthId } from 'src/helpers/auth'
import { API_URLS } from 'src/services/apis'
import { useCrudProfile } from 'src/services/hooks/useCrudProfile'

export const BoardTabs = () => {
  const authId = getAuthId()

  const { single: authUser } = useCrudProfile()

  const [selectedItem, setSelectedItem] = useState(0)

  const handleChange = (_: SyntheticEvent, selectedItem: number) => {
    setSelectedItem(selectedItem)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      REACT_QUERY_CLIENT.invalidateQueries({ queryKey: [API_URLS.profile, authId] })
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <Box sx={{ flexGrow: 1, p: 2, border: 1, bgcolor: 'background.paper', display: 'flex' }}>
        <div>
          Balance: <Money money={authUser?.balance ? +authUser?.balance : 0} />
        </div>
      </Box>

      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={selectedItem}
          onChange={handleChange}
          sx={{ borderRight: 1, borderColor: 'divider', width: 130, minWidth: 130 }}
        >
          {BOARD_MENU_ITEMS.map((item, itemIndex) => {
            return (
              <Tab
                key={item.label}
                label={item.label}
                id={`vertical-tab-${itemIndex}`}
                aria-controls={`vertical-tabpanel-${itemIndex}`}
                sx={{ textAlign: 'left' }}
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
              style={{ overflowY: 'auto', maxHeight: 350 }}
            >
              {selectedItem === itemIndex && <MenuComponent />}
            </div>
          )
        })}
      </Box>
    </div>
  )
}
