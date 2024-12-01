import { ReactNode } from 'react'

import { Container } from '@mui/material'

import { Footer } from 'src/components/cms/templates/layouts/Footer'
import { Header } from 'src/components/cms/templates/layouts/Header'
import { Navbar } from 'src/components/cms/templates/layouts/Navbar'

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container maxWidth={false} disableGutters component='main' className='main'>
      <div className='snow-container'>
        <div className='snow' />
      </div>
      <Header />
      <Navbar />
      <Container maxWidth='xl' component='section' className='main-section'>
        {children}
      </Container>
      <Footer />
    </Container>
  )
}
