import { useMemo } from 'react'
import { useAtom } from 'jotai'

import { findUserTables } from 'src/helpers/clientHelpersPoker'
import { useAuth } from 'src/hooks/useAuth'
import { allTablesAtom } from 'src/contexts/allTablesAtom'
import { TablesList } from 'src/components/organisms/table/TablesList'
import { DndWindow } from 'src/components/organisms/dnd/DndWindow'
import { TableWindow } from 'src/components/organisms/table/TableWindow'
import { PageLayout } from 'src/components/molecules/PageLayout'
import { WindowTopBar } from 'src/components/organisms/boards/WindowTopBar'
import { ConfirmModal } from 'src/components/organisms/modals/ConfirmModal'
import { BuyinModal } from 'src/components/organisms/modals/BuyinModal'

export const GameBoard = () => {
  const { username } = useAuth()
  const [allTables] = useAtom(allTablesAtom)

  const userTables = useMemo(() => {
    return findUserTables(allTables, username)
  }, [allTables, username])

  return (
    <PageLayout>
      <div className='home'>
        <ConfirmModal />
        <BuyinModal />
        <div className='home-tables'>
          <TablesList />
        </div>
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
