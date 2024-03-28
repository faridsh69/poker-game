import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from '@mui/material'

import { TextController } from './controllers/TextController'
import { TypeModel, TypePropsFormMui } from 'src/interfaces'

export const FormMui = (props: TypePropsFormMui) => {
  const { inputs, values, schema, onSubmit, submitText } = props

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    values,
  })
  console.log('1 errors', errors)

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
        const { component: InputController = TextController, name, ...rest } = input

        return <InputController control={control} name={name} key={name} {...rest} />
      })}
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 1, mb: 2 }}>
        {submitText}
      </Button>
    </Box>
  )
}
