import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Loading } from 'src/components/cms/molecules/Loading'
import { FormMui } from 'src/components/cms/templates/FormMui'
import { API_URLS } from 'src/configs/constants'
import { MODEL_FORMS_NAMES } from 'src/configs/forms'
import { getAuthId } from 'src/helpers/auth'
import { getFormInputs, getFormSchema } from 'src/helpers/forms'
import { useCrud } from 'src/hooks/useCrud'
import { TypeModel } from 'src/interfaces'

const AdminProfile = () => {
  const { t } = useTranslation()

  const authId = getAuthId()

  const { list: users, updateMutation } = useCrud(API_URLS.users)

  const authUser = useMemo(() => users.find(u => u.id === authId), [users, authId])

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

// eslint-disable-next-line import/no-default-export
export default AdminProfile
