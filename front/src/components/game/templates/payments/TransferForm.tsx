import { useMemo } from 'react'

import { Box, Typography } from '@mui/material'

import { FormMui } from 'src/components/cms/templates/FormMui'
import { TableMui } from 'src/components/cms/templates/TableMui'
import { MODEL_FORMS_NAMES, TRANSACTIONS_REASONS } from 'src/configs/forms'
import { getAuthId } from 'src/helpers/auth'
import { calculateBodyCells, calculateHeadCells, filterTableBodyCells, filterTableHeaderCells } from 'src/helpers/table'
import { useCrud } from 'src/hooks/useCrud'
import { TypeModel } from 'src/interfaces'
import { API_URLS } from 'src/services/apis'

export const TransferForm = () => {
  const { list, createMutation } = useCrud(API_URLS.transactions)

  const authId = getAuthId()

  const onSubmit = (data: TypeModel) => {
    createMutation.mutate({
      username: data.username,
      price: data.price,
      description: data.price,
      user_giving: true,
      reason: TRANSACTIONS_REASONS[2],
    })
  }

  const transactions = useMemo(() => {
    return list.filter(transaction => transaction.user_id === authId && transaction.reason === TRANSACTIONS_REASONS[2])
  }, [list])

  const headCells = useMemo(() => {
    return filterTableHeaderCells(calculateHeadCells(list, API_URLS.transactions), MODEL_FORMS_NAMES.transfer)
  }, [list])

  const bodyCells = useMemo(() => {
    return filterTableBodyCells(calculateBodyCells(list, API_URLS.transactions), MODEL_FORMS_NAMES.transfer)
  }, [list])

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h6'>Transfer Form</Typography>
      <Typography>Available for transfer: x$</Typography>

      <FormMui
        formName={MODEL_FORMS_NAMES.transfer}
        values={undefined}
        onSubmit={onSubmit}
        submitText={'Transfer'}
        isUpdating={false}
      />
      <Box sx={{ p: 0, maxWidth: 600 }}>
        <Typography variant='h6'>Transfer History</Typography>
        <TableMui list={transactions} headCells={headCells} bodyCells={bodyCells} />
      </Box>
    </Box>
  )
}
