import { Outlet } from 'react-router-dom'

import { Breadcrumb } from '../molecules/Breadcrumb'
import { Container } from '@mui/material'

import { AdminSidebar } from 'src/components/cms/templates/layouts/AdminSidebar'

const AdminDashboard = () => {
  return (
    <Container className='admin' maxWidth='xl' component='section'>
      <AdminSidebar />
      <div className='admin-content'>
        <Breadcrumb />
        <Outlet />
      </div>
    </Container>
  )
}

// eslint-disable-next-line import/no-default-export
export default AdminDashboard
