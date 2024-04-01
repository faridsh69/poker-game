import { Box, Typography } from '@mui/material'

import {
  calculateBodyCells,
  calculateHeadCells,
  filterTableBodyCells,
  filterTableHeaderCells,
} from 'src/helpers/table'
import { MODEL_FORMS_NAMES, PAYMENTS_STATUSES } from 'src/configs/forms'
import { getFormInputs, getFormSchema } from 'src/helpers/forms'
import { useCrud } from 'src/hooks/useCrud'
import { FormMui } from 'src/components/cms/templates/FormMui'
import { TableMui } from 'src/components/cms/templates/TableMui'
import { API_URLS } from 'src/configs/constants'
import { TypeModel } from 'src/interfaces'

export const DepositForm = () => {
  const { list, createMutation } = useCrud(API_URLS.payments)

  const onSubmit = (data: TypeModel) => {
    createMutation.mutate({
      user_id: 0,
      status: PAYMENTS_STATUSES[0],
      price: data.price,
      user_giving: true,
      description: data.description,
      gateway: data.gateway,
      wallet: data.wallet,
    })
  }

  const headCells = calculateHeadCells(list, API_URLS.payments)
  const bodyCells = calculateBodyCells(list, API_URLS.payments)

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h6'>Deposit Form</Typography>
      <FormMui
        inputs={getFormInputs(MODEL_FORMS_NAMES.deposit)}
        schema={getFormSchema(MODEL_FORMS_NAMES.deposit)}
        values={undefined}
        onSubmit={onSubmit}
        submitText={'Deposit'}
        isUpdating={false}
      />
      <Box sx={{ p: 0, maxWidth: 600 }}>
        <Typography variant='h6'>Deposit History</Typography>
        <TableMui
          list={list}
          headCells={filterTableHeaderCells(headCells, MODEL_FORMS_NAMES.deposit)}
          bodyCells={filterTableBodyCells(bodyCells, MODEL_FORMS_NAMES.deposit)}
        />
      </Box>
    </Box>
  )
}
