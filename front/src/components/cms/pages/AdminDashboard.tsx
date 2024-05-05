import { Outlet } from 'react-router-dom'

import { Breadcrumb } from '../molecules/Breadcrumb'
import { Box } from '@mui/material'

import { AdminSidebar } from 'src/components/cms/templates/AdminSidebar'
import { PageLayout } from 'src/components/cms/templates/PageLayout'

const AdminDashboard = () => {
  const drawerWidth = 240

  return (
    <PageLayout>
      <Box sx={{ display: 'flex' }}>
        <AdminSidebar drawerWidth={drawerWidth} />
        <Box component='main' sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Breadcrumb />
          <Outlet />
        </Box>
      </Box>
    </PageLayout>
  )
}

// eslint-disable-next-line import/no-default-export
export default AdminDashboard
