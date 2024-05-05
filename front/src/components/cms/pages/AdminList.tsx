import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { Box, Button } from '@mui/material'

import { TableMui } from 'src/components/cms/templates/TableMui'
import { calculateBodyCells, calculateHeadCells } from 'src/helpers/table'
import { useCrud } from 'src/hooks/useCrud'

const AdminList = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const { model } = useParams() as { model: string }

  const { list, deleteMutation } = useCrud(model)

  const handleDelete = useCallback(
    (id: number) => {
      deleteMutation.mutate(id)
    },
    [deleteMutation],
  )

  const handleEdit = (id: number) => navigate(`/admin/${model}/${id}/edit`)

  return (
    <Box>
      <Button component={Link} to={`/admin/${model}/create`} variant='outlined' sx={{ my: 2 }}>
        {t('Create New Record')}
      </Button>
      <TableMui
        list={list}
        headCells={calculateHeadCells(list, model)}
        bodyCells={calculateBodyCells(list, model)}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Box>
  )
}

// eslint-disable-next-line import/no-default-export
export default AdminList
