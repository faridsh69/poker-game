import { Loading } from 'src/components/cms/molecules/Loading'
import { FormMui } from 'src/components/cms/templates/FormMui'
import { MODEL_FORMS_NAMES } from 'src/configs/forms'
import { TypeModel } from 'src/interfaces'
import { useCrudProfile } from 'src/services/hooks/useCrudProfile'

const AdminProfile = () => {
  const { single: authUser, updateMutation } = useCrudProfile()

  const onSubmit = (data: TypeModel) => {
    delete data.password
    updateMutation.mutate(data)
  }

  if (!authUser) return <Loading />

  return (
    <FormMui
      formName={MODEL_FORMS_NAMES.profile}
      values={authUser}
      onSubmit={onSubmit}
      submitText='Update Profile'
      isUpdating={true}
    />
  )
}

// eslint-disable-next-line import/no-default-export
export default AdminProfile
