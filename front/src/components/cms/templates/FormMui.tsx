import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { TextController } from './controllers/TextController'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from '@mui/material'

import { toFormalCase } from 'src/helpers/common'
import { getFormInputs, getFormSchema } from 'src/helpers/forms'
import { TypeModel, TypePropsFormMui } from 'src/interfaces'

export const FormMui = (props: TypePropsFormMui) => {
  const { formName, values, onSubmit, isUpdating = false, submitText } = props

  const inputs = useMemo(() => {
    return getFormInputs(formName)
  }, [formName])

  const schema = useMemo(() => {
    return getFormSchema(formName)
  }, [formName])

  const { t } = useTranslation()

  const defaultSubmitText = submitText ? submitText : isUpdating ? t('Update') : t('Create')

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    values,
  })

  const onGeneralSubmit = useCallback(
    (data: TypeModel) => {
      onSubmit(data)
    },
    [onSubmit],
  )

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onGeneralSubmit)}
      sx={{ mt: 2, display: 'flex', flexDirection: 'column', minWidth: '333px' }}
    >
      {inputs.map(input => {
        const { component: InputController = TextController, name, disableOnUpdate, ...rest } = input
        const inputType = input.type || 'text'
        const inputLabel = input.label || toFormalCase(name)
        const disabled = isUpdating ? disableOnUpdate : false

        return (
          <InputController
            control={control}
            name={name}
            type={inputType}
            label={inputLabel}
            disabled={!!disabled}
            key={name}
            {...rest}
          />
        )
      })}
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 1, mb: 2 }}>
        {defaultSubmitText}
      </Button>
    </Box>
  )
}
