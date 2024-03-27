import { ActionButton } from 'src/components/game/templates/actions/details/ActionButton'
import { TypeTableProps } from 'src/interfaces'
import { useSocketActions } from 'src/hooks/game/useSocketActions'
import { useAtom } from 'jotai'
import { confirmModalAtom } from 'src/contexts/confirmModalAtom'

export const FoldAction = (props: TypeTableProps & { callActionAmount: number }) => {
  const { table, callActionAmount } = props

  const { handleFoldAction } = useSocketActions(table.id)

  const [, setConfirmModal] = useAtom(confirmModalAtom)

  const handleConfirmFoldAction = () => {
    if (callActionAmount) {
      handleFoldAction()
      return
    }

    setConfirmModal({
      show: true,
      message: 'You have check option, Are you sure you want to do FOLD?',
      onConfirm: () => {
        handleFoldAction()
        setConfirmModal({ show: false })
      },
    })
  }

  return <ActionButton label='Fold' onClick={handleConfirmFoldAction} />
}
