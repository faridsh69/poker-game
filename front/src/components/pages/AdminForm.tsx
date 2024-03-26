import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { MODEL_SCHEMAS } from 'src/configs/schemas'
import { MODEL_FORMS } from 'src/configs/forms'
import { useCrud } from 'src/hooks/useCrud'
import { FormMui } from 'src/components/organisms/admin/FormMui'
import { Loading } from 'src/components/molecules/Loading'
import { TypeFormInput, TypeModel } from 'src/interfaces'

const AdminForm = () => {
  const { t } = useTranslation()

  const { model, id } = useParams()
  const modelId = id ? +id : 0

  const { list, createMutation, updateMutation } = useCrud(model as string)

  const modelObject = useMemo(() => list.find(item => item.id === modelId), [list, modelId])

  const modelInputs: TypeFormInput = useMemo(() => {
    // @ts-ignore
    return MODEL_FORMS[model]
  }, [model])

  const modelSchema = useMemo(() => {
    // @ts-ignore
    return MODEL_SCHEMAS[model]
  }, [model])

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
      inputs={modelInputs}
      schema={modelSchema}
      values={modelObject}
      onSubmit={onSubmit}
      submitText={id ? t('Update') : t('Create')}
    />
  )
}

export default AdminForm
