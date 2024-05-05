import { useMemo } from 'react'

import { BoardTabs } from './BoardTabs'
import { useAtom } from 'jotai'

import { PageLayout } from 'src/components/cms/templates/PageLayout'
import { WindowTopBar } from 'src/components/game/templates/boards/WindowTopBar'
import { DndWindow } from 'src/components/game/templates/dnd/DndWindow'
import { BuyinModal } from 'src/components/game/templates/modals/BuyinModal'
import { ConfirmModal } from 'src/components/game/templates/modals/ConfirmModal'
import { TableWindow } from 'src/components/game/templates/table/TableWindow'
import { allTablesAtom } from 'src/contexts/allTablesAtom'
import { getAuthUsername } from 'src/helpers/auth'
import { findUserTables } from 'src/helpers/clientHelpersPoker'

export const GameBoard = () => {
  const username = getAuthUsername()
  const [allTables] = useAtom(allTablesAtom)

  const userTables = useMemo(() => {
    return findUserTables(allTables, username)
  }, [allTables, username])

  return (
    <PageLayout>
      <div className='home'>
        <ConfirmModal />
        <BuyinModal />
        <DndWindow
          topbar={
            <div className='dnd-window-topbar-flex'>
              <div className='dnd-window-topbar-flex-title'>{username} account</div>
            </div>
          }
          body={<BoardTabs />}
        />
        <div className='home-runtables'>
          {userTables.map(userTable => {
            return (
              <DndWindow
                key={userTable.id}
                topbar={<WindowTopBar table={userTable} />}
                body={<TableWindow table={userTable} />}
              />
            )
          })}
        </div>
      </div>
    </PageLayout>
  )
}
