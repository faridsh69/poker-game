import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from '@mui/material'

import { InputController } from './controllers/InputController'
import { TypeModel, TypePropsFormMui } from 'src/interfaces'

export const FormMui = (props: TypePropsFormMui) => {
  const { inputs, values, schema, onSubmit, submitText } = props

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
      sx={{ mt: 1, display: 'flex', flexDirection: 'column', minWidth: '333px' }}
    >
      {inputs.map(input => {
        const { component: InputComponent = InputController, name, ...rest } = input

        return <InputComponent control={control} name={name} {...rest} key={name} />
      })}
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 1, mb: 2 }}>
        {submitText}
      </Button>
    </Box>
  )
}
