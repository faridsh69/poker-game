import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import { useAtom } from 'jotai'

import { Money } from 'src/components/game/molecules/Money/Money'
import { confirmModalAtom } from 'src/contexts/confirmModalAtom'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { TypeTableProps } from 'src/interfaces'

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
        NL Hold'em #{table.id} - <Money money={table.blinds.small} brif /> / <Money money={table.blinds.big} brif /> -
        Buy-In <Money money={table.buyin.min} brif /> - <Money money={table.buyin.max} brif />
      </div>
      <IconButton onMouseDown={handleConfirmLeaveTable} className='dnd-window-topbar-flex-close'>
        <CloseIcon />
      </IconButton>
    </div>
  )
}
