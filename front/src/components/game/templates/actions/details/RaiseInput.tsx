import { ChangeEvent, useEffect, useState } from 'react'

import { formatInputTypeFloat, getAcceptableValue } from 'src/helpers/common'

export const RaiseInput = (props: {
  value: number
  min: number
  step: number
  max: number
  changeRaiseAmount: (value: number) => void
}) => {
  const { value, min, step, max, changeRaiseAmount } = props

  console.log('1 value', value)

  const [inputValue, setInputValue] = useState<string>('0')

  const [focused, setFocused] = useState(false)

  useEffect(() => {
    if (focused) return

    setInputValue(value + '')
  }, [focused, value])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    console.log('1 inputValue', inputValue)
    const formatedInput = formatInputTypeFloat(inputValue, max, 2)
    console.log('2 formatedInput', formatedInput)
    const acceptableValue = getAcceptableValue(formatedInput, min, max, step)
    console.log('3 acceptableValue', acceptableValue)

    setInputValue(formatedInput)

    changeRaiseAmount(acceptableValue)
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
