import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import { Checkbox, FormControlLabel } from '@mui/material'

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
