import { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export const CountDownTimer = (props: { timeout: number; onFinishTimer: () => void }) => {
  const { timeout = 30, onFinishTimer } = props

  const [progress, setProgress] = useState(timeout)

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
    <div className='timer-action'>
      <CircularProgress
        className='timer-action-circle'
        variant='determinate'
        value={(progress * 100) / timeout}
      />
      <div className='timer-action-text'>{Math.round(progress)}</div>
    </div>
  )
}
