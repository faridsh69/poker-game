import { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { USER_ACTION_THINKING_TIMEOUT } from 'src/configs/clientConstantsPoker'

export const CountDownTimer = (props: { onFinishTimer: () => void }) => {
  const { onFinishTimer } = props
  const [progress, setProgress] = useState(USER_ACTION_THINKING_TIMEOUT)

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
      <CircularProgress
        variant='determinate'
        value={(progress * 100) / USER_ACTION_THINKING_TIMEOUT}
      />
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
