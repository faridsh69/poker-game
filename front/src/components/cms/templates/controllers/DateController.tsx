import { useCallback } from 'react'
import { Controller } from 'react-hook-form'

import { FormControl, FormHelperText } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment, { Moment } from 'moment'

import { SERVER_DATE_FORMAT } from 'src/configs/constants'
import { toBool, toFormalCase } from 'src/helpers/common'
import { TypePropsInputController } from 'src/interfaces'

export const DateController = (props: TypePropsInputController) => {
  const { control, name, label, ...rest } = props

  const inputLabel = label || toFormalCase(name)

  const changeToDatePickerFormat = useCallback((value: unknown) => (value ? moment(value) : null), [])

  const changeToServerDateFormat = useCallback((date: Moment | null, onChange: (date: string | null) => void) => {
    onChange(date?.format(SERVER_DATE_FORMAT) || null)
  }, [])

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <FormControl error={toBool(error)} sx={{ width: '300px', mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                // @ts-ignore
                label={inputLabel}
                value={changeToDatePickerFormat(value)}
                onChange={(date: Moment | null) => changeToServerDateFormat(date, onChange)}
                {...rest}
              />
              {<FormHelperText>{toFormalCase(error?.message)}</FormHelperText>}
            </LocalizationProvider>
          </FormControl>
        )
      }}
    />
  )
}
