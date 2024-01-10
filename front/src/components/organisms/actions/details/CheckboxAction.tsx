import { Checkbox, FormControlLabel } from '@mui/material'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import SquareRoundedIcon from '@mui/icons-material/SquareRounded'

export const CheckboxAction = (props: {
  label: string | JSX.Element
  checked: boolean
  onClick: () => void
}) => {
  const { label, checked, onClick } = props

  return (
    <div className='checkbox-action'>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onClick={onClick}
            icon={<SquareRoundedIcon />}
            checkedIcon={<TaskAltIcon />}
          />
        }
        label={label}
      />
    </div>
  )
}
