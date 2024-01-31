import { useState, useEffect } from 'react'
import { LinearProgress, CircularProgress } from '@mui/material'

import { getMinutes, getSeconds, playSound, stopSound } from 'src/helpers/common'
import { CLIENT_TIMEOUT_FAULT } from 'src/configs/clientConstantsPoker'
import { TypeTimerType } from 'src/interfaces'

export const CountDownTimer = (props: {
  remainingSeconds: number
  onFinishTimer?: () => void
  type?: TypeTimerType
  duration?: number
}) => {
  const {
    remainingSeconds: propRemainingTime = CLIENT_TIMEOUT_FAULT,
    onFinishTimer,
    type = 'circle',
    duration = 0,
  } = props

  const remainingSeconds = propRemainingTime > 0 ? propRemainingTime : 0
  const realDuration = duration ? duration : remainingSeconds

  const [restTime, setRestTime] = useState(remainingSeconds)

  useEffect(() => {
    setRestTime(remainingSeconds)
  }, [remainingSeconds])

  useEffect(() => {
    const timer = setInterval(() => {
      setRestTime(prev => (prev >= 1 ? Math.floor(prev - 1) : 0))
    }, 1000)

    return () => {
      clearInterval(timer)
      stopSound('timer')
    }
  }, [duration])

  useEffect(() => {
    if (restTime === 0) {
      onFinishTimer && onFinishTimer()
      return
    }

    if (restTime < 10) {
      playSound('timer')
    }
  }, [restTime, onFinishTimer])

  const progressValue = (restTime * 100) / realDuration
  const realProgressValue = progressValue > 100 ? 100 : progressValue

  return (
    <div className='timer-action'>
      {type === 'circle' && (
        <>
          <CircularProgress
            className='timer-action-circle'
            variant='determinate'
            value={realProgressValue}
          />
          <div className='timer-action-text'>{restTime}</div>
        </>
      )}

      {type === 'line' && (
        <LinearProgress
          className='timer-action-line'
          variant='determinate'
          value={realProgressValue}
        />
      )}

      {type === 'text' && (
        <div className='timer-text'>
          {getMinutes(restTime)}:{getSeconds(restTime)}
        </div>
      )}
    </div>
  )
}
