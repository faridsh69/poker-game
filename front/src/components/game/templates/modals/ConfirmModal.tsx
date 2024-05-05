import CloseIcon from '@mui/icons-material/Close'
import { Button, IconButton, Modal } from '@mui/material'
import { useAtom } from 'jotai'

import { confirmModalAtom } from 'src/contexts/confirmModalAtom'

export const ConfirmModal = () => {
  const [confirmModal, setConfirmModal] = useAtom(confirmModalAtom)

  const closeConfirmModal = () => {
    setConfirmModal({ show: false })
  }

  if (!confirmModal.show) return null

  return (
    <Modal open={confirmModal.show} onClose={closeConfirmModal} className='confirm-modal'>
      <div className='confirm-modal-container'>
        <div className='confirm-modal-container-header'>
          <div className='confirm-modal-container-header-title'>Confirm</div>
          <IconButton onClick={closeConfirmModal} className='confirm-modal-container-header-close'>
            <CloseIcon />
          </IconButton>
        </div>
        <div className='confirm-modal-container-body'>
          <div className='confirm-modal-container-body-title'>{confirmModal.message}</div>
          <div className='confirm-modal-container-body-actions'>
            <Button color='success' variant='contained' onClick={confirmModal.onConfirm}>
              Ok
            </Button>
            <Button color='secondary' variant='contained' onClick={closeConfirmModal}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
