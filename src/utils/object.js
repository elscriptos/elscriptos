
export function removeFromObject(object, keyToRemove) {
  const result = {}
  for (const key in object) {
    if (key !== keyToRemove)
      result[key] = object[key]
  }
  return result
}

export function setFromObject(object, keyToSet, value) {
  return {
    ...object,
    [keyToSet]: value
  }
}
