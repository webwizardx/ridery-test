/* eslint-disable @typescript-eslint/no-explicit-any */
export function cleanObject(obj: any): any {
  const cleanedObject: any = {}

  for (const key in obj) {
    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      cleanedObject[key] = cleanObject(obj[key]) // recursive call for nested objects
    } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      cleanedObject[key] = obj[key]
    }
    if (Array.isArray(obj[key]) && !obj[key].length) {
      delete cleanedObject[key]
    }
  }

  return cleanedObject
}

export function getURLSearchParamsByObject(object: any): URLSearchParams {
  // Create deep copy of object to prevent received object from being modified.
  object = cleanObject({ ...object })

  const searchParams = new URLSearchParams()

  // convert all values to string.
  Object.keys(object).forEach((key) => {
    // If it is an array make sure to append each value as an array element
    if (Array.isArray(object[key])) {
      object[key].forEach((value: any) => {
        searchParams.append(`${key}[]`, value)
      })
    } else {
      // Otherwise only convert it to string.
      const value = object[key] instanceof Date ? object[key].toISOString() : String(object[key])

      searchParams.append(key, value)
    }
  })

  return searchParams
}
