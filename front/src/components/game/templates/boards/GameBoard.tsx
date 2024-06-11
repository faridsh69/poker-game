import { useMemo } from 'react'

import { TableBackground } from '../table/TableBackground'
import { BoardTabs } from './BoardTabs'

import { PageLayout } from 'src/components/cms/templates/PageLayout'
import { DndWindow } from 'src/components/game/templates/dnd/DndWindow'
import { getAuthUsername } from 'src/helpers/auth'

export const GameBoard = () => {
  const authUsername = useMemo(() => {
    return getAuthUsername()
  }, [])

  return (
    <PageLayout>
      <div className='home'>
        <TableBackground width={1} height={1} />

        <DndWindow
          topbar={
            <div className='dnd-window-topbar-flex'>
              <div className='dnd-window-topbar-flex-title'>{authUsername} account</div>
            </div>
          }
          body={<BoardTabs />}
        />
        {/* <div className='home-runtables'>
          {userTables.map(userTable => {
            return (
              <DndWindow
                key={userTable.id}
                topbar={<WindowTopBar table={userTable} />}
                body={<TableWindow table={userTable} />}
              />
            )
          })}
        </div> */}
      </div>
    </PageLayout>
  )
}
