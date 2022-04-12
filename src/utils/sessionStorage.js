function getItem(key) {
  const value = sessionStorage.getItem(key)
  return value
}

function setItem(key, value) {
  if (value === null || value === undefined) return
  if (getItem(key)) {
    sessionStorage.removeItem(key)
  }
  // const toJson = JSON.stringify(value)
  sessionStorage.setItem(key, value)
}

export { getItem, setItem }
