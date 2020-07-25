import config from '../config'

export function saveStore({
  cache,
  userStickers,
  separator
}) {
  const data = {
    cache,
    userStickers,
    separator
  }
  localStorage.setItem(config.localStorageKey, JSON.stringify(data))
}

export function loadStore() {
  const data = localStorage.getItem(config.localStorageKey)
  if (!data) return;
  try {
    return JSON.parse(data)
  } catch(e) {
    console.warn('Cannot load elscriptos save :\'(', e)
  }
}
