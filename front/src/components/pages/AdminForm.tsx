import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { FOOD_SCHEMA } from 'src/configs/schemas'
// import { toFormalCase } from 'src/helpers/common'
import { useCrud } from 'src/hooks/useCrud'
import { CheckBoxController } from 'src/components/organisms/admin/controllers/CheckboxController'
import { EditorController } from 'src/components/organisms/admin/controllers/EditorController'
// import { SelectController } from 'src/components/organisms/admin/controllers/SelectController'
import { FormMui } from 'src/components/organisms/admin/FormMui'
import { Loading } from 'src/components/molecules/Loading'

const AdminForm = () => {
  const { t } = useTranslation()

  const { model, id } = useParams()

  const modelId = id ? +id : 0

  const { list, createMutation, updateMutation } = useCrud(model as string)

  const modelObject = useMemo(() => list.find(item => item.id === modelId), [list, modelId])

  const onSubmit = data => {
    if (id) {
      updateMutation.mutate(data)
    } else {
      createMutation.mutate(data)
    }
  }

  if (id && !modelObject) return <Loading />

  // images, videos, order

  return (
    <FormMui
      schema={FOOD_SCHEMA}
      onSubmit={onSubmit}
      submitText={id ? t('Update') : t('Create')}
      defaultValues={modelObject}
      inputs={[
        {
          name: 'title',
        },
        // {
        //   name: 'category_id',
        //   component: SelectController,
        //   options: categoryOptions,
        // },
        // {
        //   name: 'tags',
        //   component: SelectController,
        //   options: tagOptions,
        //   multiple: true,
        // },
        // {
        //   name: 'relateds',
        //   component: SelectController,
        //   options: relatedOptions,
        //   multiple: true,
        // },
        {
          name: 'url',
        },
        {
          name: 'price',
          type: 'number',
        },
        {
          name: 'discount_price',
          type: 'number',
        },
        {
          name: 'description',
          multiline: true,
          rows: 3,
        },
        {
          component: CheckBoxController,
          name: 'activated',
        },
        {
          name: 'calorie',
          type: 'number',
        },
        {
          name: 'content',
          component: EditorController,
        },
      ]}
    />
  )
}

export default AdminForm
