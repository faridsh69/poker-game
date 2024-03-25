import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button } from '@mui/material'

import { useCrud } from 'src/hooks/useCrud'
import { TableMui } from 'src/components/organisms/admin/TableMui'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { calculateBodyCells, calculateHeadCells } from 'src/helpers/table'

const AdminList = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const { model } = useParams() as { model: string }

  const { list, deleteMutation } = useCrud(model)

  const handleDelete = useCallback((id: number) => {
    deleteMutation.mutate(id)
  }, [])

  const handleEdit = (id: number) => navigate(`/admin/${model}/${id}/edit`)

  const headCells = calculateHeadCells(list, model)

  const bodyCells = calculateBodyCells(list, model)

  return (
    <Box>
      <Button component={Link} to={`/admin/${model}/create`}>
        {t('Create New Record')}
      </Button>
      <TableMui
        list={list}
        headCells={headCells}
        bodyCells={bodyCells}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </Box>
  )
}

export default AdminList
