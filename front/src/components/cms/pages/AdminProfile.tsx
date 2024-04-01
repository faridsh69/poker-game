import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { getFormInputs, getFormSchema } from 'src/helpers/forms'
import { MODEL_FORMS_NAMES } from 'src/configs/forms'
import { getAuthId } from 'src/helpers/auth'
import { TypeModel } from 'src/interfaces'
import { useCrud } from 'src/hooks/useCrud'
import { FormMui } from 'src/components/cms/templates/FormMui'
import { Loading } from 'src/components/cms/molecules/Loading'
import { API_URLS } from 'src/configs/constants'

const AdminProfile = () => {
  const { t } = useTranslation()

  const authId = getAuthId()

  const { list: users, updateMutation } = useCrud(API_URLS.users)

  const authUser = useMemo(() => users.find(u => u.id == authId), [users, authId])

  const onSubmit = (data: TypeModel) => {
    updateMutation.mutate(data)
  }

  if (authId && !authUser) return <Loading />

  return (
    <div>
      <FormMui
        inputs={getFormInputs(MODEL_FORMS_NAMES.profile)}
        schema={getFormSchema(MODEL_FORMS_NAMES.profile)}
        values={authUser}
        onSubmit={onSubmit}
        submitText={t('Update')}
        isUpdating={true}
      />
    </div>
  )
}

export default AdminProfile
