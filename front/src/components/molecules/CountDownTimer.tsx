import { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { TIMER_SECONDS } from 'src/configs/clientConstantsPoker'

export const CountDownTimer = ({ onFinishTimer }) => {
  const [progress, setProgress] = useState(TIMER_SECONDS)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => (prevProgress ? prevProgress - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress === 0) {
      onFinishTimer()
    }
  }, [progress, onFinishTimer])

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant='determinate' value={(progress * 100) / TIMER_SECONDS} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='caption' component='div' color='text.secondary'>
          {`${Math.round(progress)}`}
        </Typography>
      </Box>
    </Box>
  )
}
