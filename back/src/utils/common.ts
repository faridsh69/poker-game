export const makeUniqueArray = initialArray => {
  const arrayOfJsons = initialArray.map(value => JSON.stringify(value))

  return initialArray.filter(
    (value, index) => arrayOfJsons.indexOf(JSON.stringify(value)) === index,
  )
}

export const makeUniqueArrayByPropery = (initialArray, property) => {
  const arrayOfProperty = initialArray.map(object => object[property])

  return initialArray.filter((object, index) => arrayOfProperty.indexOf(object[property]) === index)
}
