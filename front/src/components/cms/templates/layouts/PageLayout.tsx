import { Container } from '@mui/material'

import { Footer } from 'src/components/cms/templates/layouts/Footer'
import { Header } from 'src/components/cms/templates/layouts/Header'
import { Navbar } from 'src/components/cms/templates/layouts/Navbar'

export const PageLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <Container maxWidth={false} disableGutters component='main'>
      <Header />
      <Navbar />
      <Container maxWidth='xl' component='section' className='section-container'>
        {children}
      </Container>
      <Footer />
    </Container>
  )
}
