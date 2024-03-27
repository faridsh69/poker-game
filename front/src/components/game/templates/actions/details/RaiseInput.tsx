import { ChangeEvent, useEffect, useState } from 'react'

export const RaiseInput = (props: {
  value: number
  min: number
  step: number
  max: number
  changeRaiseAmount: (value: number) => void
}) => {
  const { value, min, step, max, changeRaiseAmount } = props

  const [inputValue, setInputValue] = useState(0)

  const [focused, setFocused] = useState(false)

  useEffect(() => {
    if (focused) return

    setInputValue(value)
  }, [focused, value])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = +e.target.value

    if (isNaN(newValue)) {
      newValue = value
    } else if (newValue < min) {
      newValue = min
    } else if (newValue < min + step && newValue !== min) {
      newValue = min + step
    } else if (newValue > max) {
      newValue = max
    }

    changeRaiseAmount(newValue)

    let newInputValue = +e.target.value

    if (isNaN(newInputValue)) {
      newInputValue = value
    }

    setInputValue(newInputValue)
  }

  const handleOnFocus = () => {
    setFocused(true)
  }

  const handleOnBlur = () => {
    setFocused(false)
  }

  return (
    <input
      value={inputValue}
      onChange={handleOnChange}
      min={min}
      max={max}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
    />
  )
}
