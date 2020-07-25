import config from '../config'
import smileys from '../constants/smileys'

const createContentSticker = (code, url) => ({ code, url })

export async function getStickers(search) {
  const response = await fetch(`${config.apiURI}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ search })
  })

  const data = await response.json()
  if (data == null || !data.stickers) return []
  return data.stickers
}

export async function getPreview(content) {
  const formData = new FormData();
  formData.append('texte', content);
  const response = await fetch('https://www.jeuxvideo.com/jvcode/forums.php?stickers=on', {
    method: 'POST',
    body: formData
  })
  return await response.text() || ''
}

export async function getContentStickers(
  stickerValues = [],
  cache,
  userStickers,
  separator
) {
  const searchStickers = stickerValues
    .filter((stickerValue, i, arr) => arr.indexOf(stickerValue) === i)
    .map(stickerValue => ({
      raw: stickerValue,
      search: stickerValue.replace(/,/gm, ' ')
    }))

  const getSavedSticker = makeGetSavedSticker(cache, userStickers, separator)

  const promises = searchStickers
    .map(searchSticker => {
      const savedSticker = getSavedSticker(searchSticker.raw)
      if (savedSticker) {
        return createContentSticker(searchSticker.raw, savedSticker)
      }
      const isOverwriting = separator === ':' && smileys.includes(searchSticker.raw)
      if (isOverwriting) return null;
      return getStickers(searchSticker.search)
        .then(stickers => {
          if (stickers.length === 0) return null;
          return createContentSticker(searchSticker.raw, stickers[0].risibank_link)
        })
    })

  const contentStickers = await Promise.all(promises)
  const filteredContentStickers = contentStickers.filter(item => item != null)

  return filteredContentStickers
}

export const makeGetSavedSticker = (cache, userStickers, separator) =>
  match => {
    const isOverwriting = separator === ':' && smileys.includes(match)
    const userSticker = userStickers[match]
    if (userSticker) return userSticker
    if (isOverwriting) return null
    return cache[match]
  }
