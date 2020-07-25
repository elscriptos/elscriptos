import config from '../config'

export function saveStore({
  cache,
  userStickers,
  separator
}) {
  const data = {
    cache: Array.from(cache.entries()),
    userStickers,
    separator
  }
  localStorage.setItem(config.localStorageKey, JSON.stringify(data))
}

export function loadStore() {
  const data = localStorage.getItem(config.localStorageKey)
  if (!data) return null;
  try {
    const save = JSON.parse(data)
    return {
      ...save,
      cache: new Map(save.cache)
    }
  } catch(e) {
    console.warn('Cannot load elscriptos save :\'(', e)
  }
}
