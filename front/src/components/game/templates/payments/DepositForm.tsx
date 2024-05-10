import { useMemo } from 'react'

import { Box, Typography } from '@mui/material'

import { FormMui } from 'src/components/cms/templates/FormMui'
import { TableMui } from 'src/components/cms/templates/TableMui'
import { MODEL_FORMS_NAMES, PAYMENTS_STATUSES } from 'src/configs/forms'
import { getAuthId } from 'src/helpers/auth'
import { calculateBodyCells, calculateHeadCells, filterTableBodyCells, filterTableHeaderCells } from 'src/helpers/table'
import { useCrud } from 'src/hooks/useCrud'
import { TypeModel } from 'src/interfaces'
import { API_URLS } from 'src/services/apis'

export const DepositForm = () => {
  const { list, createMutation } = useCrud(API_URLS.payments)

  const authId = getAuthId()

  const onSubmit = (data: TypeModel) => {
    createMutation.mutate({
      user_id: authId,
      status: PAYMENTS_STATUSES[0],
      price: data.price,
      user_giving: true,
      description: data.description,
      gateway: data.gateway,
      wallet: data.wallet,
    })
  }

  const payments = useMemo(() => {
    return list.filter(payment => payment.user_id === authId && payment.user_giving === true)
  }, [list])

  const headCells = useMemo(() => {
    return filterTableHeaderCells(calculateHeadCells(list, API_URLS.payments), MODEL_FORMS_NAMES.deposit)
  }, [list])

  const bodyCells = useMemo(() => {
    return filterTableBodyCells(calculateBodyCells(list, API_URLS.payments), MODEL_FORMS_NAMES.deposit)
  }, [list])

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h6'>Deposit Form</Typography>
      <FormMui
        formName={MODEL_FORMS_NAMES.deposit}
        values={undefined}
        onSubmit={onSubmit}
        submitText={'Deposit'}
        isUpdating={false}
      />
      <Box sx={{ p: 0, maxWidth: 600 }}>
        <Typography variant='h6'>Deposit History</Typography>
        <TableMui list={payments} headCells={headCells} bodyCells={bodyCells} />
      </Box>
    </Box>
  )
}
