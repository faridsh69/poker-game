import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useCrud } from 'src/hooks/useCrud'
import { getLocalstorage } from 'src/helpers/common'
import { LOCAL_STORAGE_AUTH_USER_EMAIL } from 'src/configs/constants'
import { FormMui } from 'src/components/organisms/admin/FormMui'
import { Loading } from 'src/components/molecules/Loading'
import { MODEL_FORMS_NAMES } from 'src/configs/forms'
import { getFormInputs, getFormSchema } from 'src/helpers/forms'
import { TypeModel } from 'src/interfaces'

const AdminProfile = () => {
  const { t } = useTranslation()
  const { list: users, updateMutation } = useCrud('user')

  const authEmail = getLocalstorage(LOCAL_STORAGE_AUTH_USER_EMAIL)

  const authUser = useMemo(() => users.find(u => u.email == authEmail), [users, authEmail])

  const onSubmit = (data: TypeModel) => {
    updateMutation.mutate(data)
  }

  if (authEmail && !authUser) return <Loading />

  return (
    <div>
      <FormMui
        inputs={getFormInputs(MODEL_FORMS_NAMES.profile)}
        schema={getFormSchema(MODEL_FORMS_NAMES.profile)}
        values={authUser}
        onSubmit={onSubmit}
        submitText={t('Update')}
      />
    </div>
  )
}

export default AdminProfile
