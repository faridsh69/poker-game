import { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { LinearProgress } from '@mui/material'

export const CountDownTimer = (props: {
  timeout: number
  onFinishTimer: () => void
  circle?: boolean
  showText?: boolean
}) => {
  const { timeout = 30, onFinishTimer, circle = true, showText = true } = props

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
      {circle ? (
        <CircularProgress
          className='timer-action-circle'
          variant='determinate'
          value={(progress * 100) / timeout}
        />
      ) : (
        <LinearProgress
          className='timer-action-line'
          variant='determinate'
          value={(progress * 100) / timeout}
        />
      )}
      {!!showText && <div className='timer-action-text'>{Math.round(progress)}</div>}
    </div>
  )
}
