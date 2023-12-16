import { useAtom } from 'jotai'
import { Button, Modal, Slider } from '@mui/material'

import { confirmModalAtom } from 'src/contexts/confirmModalAtom'
import { useCallback } from 'react'

export const ConfirmModal = () => {
  const [confirmModal, setConfirmModal] = useAtom(confirmModalAtom)

  const closeConfirmModal = useCallback(() => {
    setConfirmModal({ show: false })
  }, [])

  if (!confirmModal.show) return null

  return (
    <Modal open={confirmModal.show} onClose={closeConfirmModal}>
      <div className='modal'>
        <h3>{confirmModal.message}</h3>
        <Button color='success' variant='contained' onClick={confirmModal.onConfirm}>
          Confirm
        </Button>
        <Button color='error' variant='contained' onClick={closeConfirmModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  )
}
