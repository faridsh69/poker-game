import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { getFormInputs, getFormSchema } from 'src/helpers/forms'
import { MODEL_FORMS_NAMES } from 'src/configs/forms'
import { getAuthUsername } from 'src/helpers/auth'
import { TypeModel } from 'src/interfaces'
import { useCrud } from 'src/hooks/useCrud'
import { FormMui } from 'src/components/cms/templates/FormMui'
import { Loading } from 'src/components/cms/molecules/Loading'

const AdminProfile = () => {
  const { t } = useTranslation()

  const username = getAuthUsername()

  const { list: users, updateMutation } = useCrud('user')

  const authUser = useMemo(() => users.find(u => u.username == username), [users, username])

  const onSubmit = (data: TypeModel) => {
    updateMutation.mutate(data)
  }

  if (username && !authUser) return <Loading />

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
