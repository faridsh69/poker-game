import { Checkbox, FormControlLabel } from '@mui/material'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

export const TableActionsGeneral = props => {
  const { table } = props

  return (
    <div className='dnd-window-body-table-actions-general'>
      <FormControlLabel
        control={<Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<TaskAltIcon />} />}
        label='Sit out next hand'
      />
      <FormControlLabel
        control={<Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<TaskAltIcon />} />}
        label='Sit out next blind'
      />
    </div>
  )
}
