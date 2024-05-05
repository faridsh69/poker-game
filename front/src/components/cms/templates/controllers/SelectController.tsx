import { Controller } from 'react-hook-form'

import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'

import { convertNullToEmptyString, toBool, toFormalCase } from 'src/helpers/common'
import { TypePropsInputController } from 'src/interfaces'

export const SelectController = (props: TypePropsInputController) => {
  const { control, name, label, options = [], multiple = false, ...rest } = props

  const inputLabel = label || toFormalCase(name)

  const inputOptions = options.map(option => ({ label: option, value: option }))

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const selectValue = !multiple ? convertNullToEmptyString(value) : value || []

        return (
          <FormControl variant='standard' error={toBool(error)}>
            <InputLabel>{inputLabel}</InputLabel>
            <Select
              label={label}
              onChange={data => {
                onChange(data)
              }}
              value={selectValue}
              multiple={multiple}
              {...rest}
            >
              {inputOptions.map(option => (
                <MenuItem value={option.value} key={option.value} disabled={value === option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{toFormalCase(error?.message)}</FormHelperText>
          </FormControl>
        )
      }}
    />
  )
}
