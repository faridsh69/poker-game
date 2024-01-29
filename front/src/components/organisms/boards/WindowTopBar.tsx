import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useAtom } from 'jotai'

import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { confirmModalAtom } from 'src/contexts/confirmModalAtom'
import { TypeTableProps } from 'src/interfaces'
import { Money } from 'src/components/molecules/Money'

export const WindowTopBar = (props: TypeTableProps) => {
  const { table } = props

  const { handleLeaveTable } = useSocketActions(table.id)

  const [, setConfirmModal] = useAtom(confirmModalAtom)

  const handleConfirmLeaveTable = () => {
    setConfirmModal({
      show: true,
      message: 'Are you sure to leave table?',
      onConfirm: () => {
        handleLeaveTable()
        setConfirmModal({ show: false })
      },
    })
  }

  return (
    <div className='dnd-window-topbar-flex'>
      <div className='dnd-window-topbar-flex-title'>
        NL Hold'em #{table.id} - <Money money={table.blinds.small} /> /{' '}
        <Money money={table.blinds.big} /> - Buy-In <Money money={table.buyin.min} /> -{' '}
        <Money money={table.buyin.max} />
      </div>
      <IconButton onMouseDown={handleConfirmLeaveTable} className='dnd-window-topbar-flex-close'>
        <CloseIcon />
      </IconButton>
    </div>
  )
}
