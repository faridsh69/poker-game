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
import { useCrudProfile } from 'src/services/hooks/useCrudProfile'

export const WithdrawForm = () => {
  const authId = getAuthId()
  const { single: authUser } = useCrudProfile()

  const { list, createMutation } = useCrud(API_URLS.payments)

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
    return filterTableHeaderCells(calculateHeadCells(list, API_URLS.payments), MODEL_FORMS_NAMES.withdraw)
  }, [list])

  const bodyCells = useMemo(() => {
    return filterTableBodyCells(calculateBodyCells(list, API_URLS.payments), MODEL_FORMS_NAMES.withdraw)
  }, [list])

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h6'>Withdraw Form</Typography>
      <Typography>Available for withdraw: {authUser?.balance || 0}$</Typography>

      <FormMui
        formName={MODEL_FORMS_NAMES.withdraw}
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
