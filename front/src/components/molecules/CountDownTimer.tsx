import { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { LinearProgress } from '@mui/material'
import { getMinutes, getSeconds } from 'src/helpers/common'

type TypeTimer = 'text' | 'circle' | 'line'

export const CountDownTimer = (props: {
  remainingSeconds: number
  onFinishTimer: () => void
  type?: TypeTimer
}) => {
  const { remainingSeconds: propRemainingTime = 30, onFinishTimer, type = 'circle' } = props
  const remainingSeconds = propRemainingTime > 0 ? propRemainingTime : 0

  const [progress, setProgress] = useState(remainingSeconds)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => (prevProgress >= 1 ? Math.floor(prevProgress - 1) : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress === 0) {
      onFinishTimer()
      // @TODO1 remove setinterval
    }
  }, [progress, onFinishTimer])

  return (
    <div className='timer-action'>
      {type === 'circle' && (
        <>
          <CircularProgress
            className='timer-action-circle'
            variant='determinate'
            value={(progress * 100) / remainingSeconds}
          />
          <div className='timer-action-text'>{Math.round(progress)}</div>
        </>
      )}

      {type === 'line' && (
        <LinearProgress
          className='timer-action-line'
          variant='determinate'
          value={(progress * 100) / remainingSeconds}
        />
      )}

      {type === 'text' && (
        <div className='timer-text'>
          {getMinutes(progress)}:{getSeconds(progress)}
        </div>
      )}
    </div>
  )
}
