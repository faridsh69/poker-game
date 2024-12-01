import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { TableMui } from '../templates/TableMui'
import { Typography } from '@mui/material'

import { MODEL_FORMS_NAMES } from 'src/configs/forms'
import { getAuthId } from 'src/helpers/auth'
import { calculateBodyCells, calculateHeadCells, filterTableBodyCells, filterTableHeaderCells } from 'src/helpers/table'
import { API_URLS } from 'src/services/apis'
import { useCrudPayment } from 'src/services/hooks/useCrudPayment'

export const DepositTable = () => {
  const { t } = useTranslation()
  const { list } = useCrudPayment()
  const authId = getAuthId()

  const headCells = useMemo(() => {
    return filterTableHeaderCells(calculateHeadCells(list, API_URLS.payments), MODEL_FORMS_NAMES.deposit)
  }, [list])

  const bodyCells = useMemo(() => {
    return filterTableBodyCells(calculateBodyCells(list, API_URLS.payments), MODEL_FORMS_NAMES.deposit)
  }, [list])

  const payments = useMemo(() => {
    // @Todo admin payment should be seperate from client payments
    return list.filter(payment => payment.user_id === authId && payment.user_giving === true)
  }, [list])

  return (
    <div>
      <Typography variant='h6'>{t('Deposit History')}</Typography>
      <TableMui list={payments} headCells={headCells} bodyCells={bodyCells} />
    </div>
  )
}
