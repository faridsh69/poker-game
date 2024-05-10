import { useCallback } from 'react'

import { Loading } from 'src/components/cms/molecules/Loading'
import { FormMui } from 'src/components/cms/templates/FormMui'
import { MODEL_FORMS_NAMES } from 'src/configs/forms'
import { TypeModel } from 'src/interfaces'
import { useCrudPassword } from 'src/services/hooks/useCrudPassword'

const AdminPassword = () => {
  const { single: authUser, updateMutation } = useCrudPassword()

  const onSubmit = useCallback((data: TypeModel) => {
    updateMutation.mutate(data)
  }, [])

  if (!authUser) return <Loading />

  return (
    <FormMui
      formName={MODEL_FORMS_NAMES.password}
      values={{ id: authUser.id }}
      onSubmit={onSubmit}
      submitText={'Update password'}
      isUpdating={true}
    />
  )
}

// eslint-disable-next-line import/no-default-export
export default AdminPassword
