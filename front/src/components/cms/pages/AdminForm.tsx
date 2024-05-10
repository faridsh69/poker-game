import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Loading } from 'src/components/cms/molecules/Loading'
import { FormMui } from 'src/components/cms/templates/FormMui'
import { MODEL_FORMS } from 'src/configs/forms'
import { useCrud } from 'src/hooks/useCrud'
import { TypeModel } from 'src/interfaces'

const AdminForm = () => {
  const { t } = useTranslation()

  const { model, id } = useParams() as { model: keyof typeof MODEL_FORMS; id: string }
  const modelId = id ? +id : 0

  const { list, createMutation, updateMutation } = useCrud(model)

  const modelObject = useMemo(() => list.find(item => item.id === modelId), [list, modelId])

  const onSubmit = (data: TypeModel) => {
    if (id) {
      updateMutation.mutate(data)
    } else {
      createMutation.mutate(data)
    }
  }

  if (id && !modelObject) return <Loading />

  return (
    <FormMui
      formName={model}
      values={modelObject}
      onSubmit={onSubmit}
      submitText={id ? t('Update') : t('Create')}
      isUpdating={!!id}
    />
  )
}
// eslint-disable-next-line import/no-default-export
export default AdminForm
