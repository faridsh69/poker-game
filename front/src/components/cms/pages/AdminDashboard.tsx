import { Outlet } from 'react-router-dom'

import { Breadcrumb } from '../molecules/Breadcrumb'
import { Box, Container } from '@mui/material'

import { AdminSidebar } from 'src/components/cms/templates/layouts/AdminSidebar'
import { PageLayout } from 'src/components/cms/templates/layouts/PageLayout'

const AdminDashboard = () => {
  return (
    <PageLayout>
      <Container>
        <AdminSidebar drawerWidth={240} />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Breadcrumb />
          <Outlet />
        </Box>
      </Container>
    </PageLayout>
  )
}

// eslint-disable-next-line import/no-default-export
export default AdminDashboard
