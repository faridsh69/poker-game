import { Checkbox, FormControlLabel } from '@mui/material'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

export const RadioAction = (props: { label: string; checked: boolean; onClick: () => void }) => {
  const { label, checked, onClick } = props

  return (
    <div className='radio-action'>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onClick={onClick}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<TaskAltIcon />}
          />
        }
        label={label}
      />
    </div>
  )
}
