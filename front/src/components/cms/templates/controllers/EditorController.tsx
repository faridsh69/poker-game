import { Controller } from 'react-hook-form'
import ReactQuill from 'react-quill'

import { FormControl, FormHelperText, FormLabel } from '@mui/material'

import { TEXT_EDITOR_FORMATS, TEXT_EDITOR_MODULES } from 'src/configs/textEditor'
import { toBool, toFormalCase } from 'src/helpers/common'
import { TypePropsInputController } from 'src/interfaces'

export const EditorController = (props: TypePropsInputController) => {
  const { control, name, label } = props

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl error={toBool(error)} style={{ height: '250px' }}>
          <FormLabel>{label || toFormalCase(name)}</FormLabel>
          <ReactQuill
            value={value as string}
            onChange={onChange}
            modules={TEXT_EDITOR_MODULES}
            formats={TEXT_EDITOR_FORMATS}
            theme='snow'
            style={{ height: '150px' }}
          />
          <FormHelperText sx={{ mt: 6 }}>{toFormalCase(error?.message)}</FormHelperText>
        </FormControl>
      )}
    />
  )
}
