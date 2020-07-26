import { editor, preview } from './elements'
import { getContentStickers, getPreview, makeGetSavedSticker } from './stickers'

function replaceContentWithStickers(inputValue, contentStickers, separator) {
  return contentStickers.reduce((acc, contentSticker) =>
    acc.replace(
      new RegExp(`${separator}${contentSticker.code}${separator}`, 'gm'),
      contentSticker.url
    ),
    inputValue
  )
}

function getStickerMatches(inputValue, separator) {
  const matchCleanRegExp = new RegExp(`${separator}(.*)${separator}`, 'gm')
  return (inputValue.match(new RegExp(`${separator}[^\n${separator} ]+${separator}`, 'gm')) || [])
    .map(match => match.replace(matchCleanRegExp, '$1'))
}

export function fillInput({
  inputValue,
  cache,
  userStickers,
  separator
}) {
  const matchs = getStickerMatches(inputValue, separator)
  if (matchs.length === 0) return;
  const getSavedSticker = makeGetSavedSticker(cache, userStickers, separator)
  const contentStickers = matchs
    .filter((match, i, arr) => arr.indexOf(match) === i)
    .map(match => ({
      url: getSavedSticker(match),
      code: match
    }))
    .filter(data => data.url != null)
  editor.value = replaceContentWithStickers(inputValue, contentStickers, separator)
}

export async function fillPreview({
  inputValue,
  cache,
  userStickers,
  separator
}) {
  const matchs = getStickerMatches(inputValue, separator)
  const contentStickers = await getContentStickers(matchs, cache, userStickers, separator)
  const content = replaceContentWithStickers(inputValue, contentStickers, separator)
  const previewHTML = await getPreview(content)
  preview.innerHTML = previewHTML

  return contentStickers.filter(({ code }) => userStickers[code] === undefined && cache[code] === undefined)
}
