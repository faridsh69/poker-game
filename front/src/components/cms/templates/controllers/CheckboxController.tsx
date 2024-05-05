import { Controller } from 'react-hook-form'

import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material'

import { toBool, toFormalCase } from 'src/helpers/common'
import { TypePropsInputController } from 'src/interfaces'

export const CheckBoxController = (props: TypePropsInputController) => {
  const { control, name, label } = props

  const inputLabel = label || toFormalCase(name)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <FormControl error={toBool(error)}>
            <FormControlLabel label={inputLabel} control={<Checkbox checked={toBool(value)} />} onChange={onChange} />
            <FormHelperText>{toFormalCase(error?.message)}</FormHelperText>
          </FormControl>
        )
      }}
    />
  )
}
