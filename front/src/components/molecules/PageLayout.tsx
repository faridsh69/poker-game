import { Box } from '@mui/material'

import { Navbar } from 'src/components/molecules/Navbar'

export const PageLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      {children}
    </Box>
  )
}
