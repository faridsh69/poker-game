import { ChangeEvent, useCallback } from 'react'
import { Controller } from 'react-hook-form'

import { TextField } from '@mui/material'

import { convertNullToEmptyString, toBool, toFormalCase } from 'src/helpers/common'
import { TypePropsInputController } from 'src/interfaces'

export const TextController = (props: TypePropsInputController) => {
  const {
    control,
    name,
    label,
    type,
    autoComplete = 'new-password',
    autoFocus = false,
    disabled = false,
    ...rest
  } = props

  const inputType = type || 'text'
  const inputLabel = label || toFormalCase(name)

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, onChange: (data: string | number) => void) => {
      const newValue = type === 'number' ? +e.target.value : e.target.value
      onChange(newValue)
    },
    [type],
  )

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value = '', onChange }, fieldState: { error } }) => {
        return (
          <TextField
            name={name}
            type={inputType}
            label={inputLabel}
            value={convertNullToEmptyString(value)}
            onChange={e => handleOnChange(e, onChange)}
            helperText={toFormalCase(error?.message)}
            error={toBool(error)}
            disabled={disabled}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            margin='normal'
            {...rest}
          />
        )
      }}
    />
  )
}
