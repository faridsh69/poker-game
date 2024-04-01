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
import { getAuthId } from 'src/helpers/auth'
import { useMemo } from 'react'

export const WithdrawForm = () => {
  const { list, createMutation } = useCrud(API_URLS.payments)

  const authId = getAuthId()

  const onSubmit = (data: TypeModel) => {
    createMutation.mutate({
      user_id: authId,
      status: PAYMENTS_STATUSES[0],
      price: data.price,
      user_giving: false,
      description: data.description,
      gateway: data.gateway,
      wallet: data.wallet,
    })
  }

  const payments = useMemo(() => {
    return list.filter(payment => payment.user_id === authId && payment.user_giving === false)
  }, [list])

  const headCells = useMemo(() => {
    return filterTableHeaderCells(
      calculateHeadCells(list, API_URLS.payments),
      MODEL_FORMS_NAMES.withdraw,
    )
  }, [list])

  const bodyCells = useMemo(() => {
    return filterTableBodyCells(
      calculateBodyCells(list, API_URLS.payments),
      MODEL_FORMS_NAMES.withdraw,
    )
  }, [list])

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h6'>Withdraw Form</Typography>
      <Typography>Available for withdraw: 1000$</Typography>

      <FormMui
        inputs={getFormInputs(MODEL_FORMS_NAMES.withdraw)}
        schema={getFormSchema(MODEL_FORMS_NAMES.withdraw)}
        values={undefined}
        onSubmit={onSubmit}
        submitText={'Withdraw'}
        isUpdating={false}
      />
      <Box sx={{ p: 0, maxWidth: 600 }}>
        <Typography variant='h6'>Withdraw History</Typography>
        <TableMui list={payments} headCells={headCells} bodyCells={bodyCells} />
      </Box>
    </Box>
  )
}
