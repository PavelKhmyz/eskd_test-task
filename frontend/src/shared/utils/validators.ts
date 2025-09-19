export const validateStringByLength = (value: string, length: number) => {
  return value.length >= length;
}

export const validatePhone = (value: string) => {
  if (value.startsWith('80') && value.length === 11) {
    return true;
  }
  if (value.startsWith('+375') && value.length === 13) {
    return true;
  }

  return false
}
