import { Controller } from 'react-hook-form'

import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material'

import { toBool, toFormalCase } from 'src/helpers/common'
import { TypePropsInputController } from 'src/interfaces'

export const RadioController = (props: TypePropsInputController) => {
  const { control, name, label, options = [] } = props

  const inputLabel = label || toFormalCase(name)

  const inputOptions = options.map(option => ({ label: option, value: option }))

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <FormControl error={toBool(error)} sx={{ my: 2 }}>
            <FormLabel>{inputLabel}</FormLabel>
            <RadioGroup value={value} name={name} defaultChecked={toBool(value)} onChange={onChange}>
              {inputOptions.map(option => {
                return (
                  <FormControlLabel
                    label={option.label}
                    value={option.value}
                    key={option.value.toString()}
                    control={<Radio />}
                  />
                )
              })}
            </RadioGroup>
            <FormHelperText>{toFormalCase(error?.message)}</FormHelperText>
          </FormControl>
        )
      }}
    />
  )
}
