import { ChangeEvent, useEffect, useState } from 'react'

import { formatInputTypeFloat, getAcceptableValue } from 'src/helpers/common'

type TypeProps = {
  value: number
  min: number
  max: number
  changeRaiseAmount: (value: number) => void
}

export const RaiseInput = (props: TypeProps) => {
  const { value, min, max, changeRaiseAmount } = props

  const [inputValue, setInputValue] = useState<string>('0')

  const [focused, setFocused] = useState(false)

  useEffect(() => {
    if (focused) return

    setInputValue(value + '')
  }, [focused, value])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const formatedInput = formatInputTypeFloat(inputValue, max, 2)
    setInputValue(formatedInput)

    const acceptableValue = getAcceptableValue(formatedInput, min, max)
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
