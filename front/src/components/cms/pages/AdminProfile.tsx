import { useTranslation } from 'react-i18next'

import { Loading } from 'src/components/cms/molecules/Loading'
import { FormMui } from 'src/components/cms/templates/FormMui'
import { MODEL_FORMS_NAMES } from 'src/configs/forms'
import { getAuthId } from 'src/helpers/auth'
import { useCrud } from 'src/hooks/useCrud'
import { TypeModel } from 'src/interfaces'
import { API_URLS } from 'src/services/apis'

const AdminProfile = () => {
  const { t } = useTranslation()

  const authId = getAuthId()

  const { single: authUser, updateMutation } = useCrud(API_URLS.users, authId)

  const onSubmit = (data: TypeModel) => {
    updateMutation.mutate(data)
  }

  if (authId && !authUser) return <Loading />

  return (
    <div>
      <FormMui
        formName={MODEL_FORMS_NAMES.profile}
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
