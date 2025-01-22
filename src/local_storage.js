const KEY = "simple_live_chat"

export const setLocalStorage = (key, value) => {
  const wmMeetData = JSON.parse(localStorage.getItem(KEY)) || {}
  wmMeetData[key] = value
  localStorage.setItem(KEY, JSON.stringify(wmMeetData))
}

export const getLocalStorage = (key) => {
  const wmMeetData = JSON.parse(localStorage.getItem(KEY)) || {}
  return wmMeetData[key]
}

export const removeLocalStorage = (key) => {
  const wmMeetData = JSON.parse(localStorage.getItem(KEY)) || {}
  wmMeetData[key] = null
  localStorage.setItem(KEY, JSON.stringify(wmMeetData))
}
