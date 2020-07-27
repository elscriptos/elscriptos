import { editor, preview } from './elements'
import { getContentStickers, getPreview, makeGetSavedSticker } from './stickers'

function replaceContentWithStickers(inputLines, contentStickers, separator) {
  const replaceCodeWithStickers = line =>
    contentStickers.reduce((acc, contentSticker) =>
      acc.replace(
        new RegExp(`${separator}${contentSticker.code}${separator}`, 'gm'),
        contentSticker.url
      ),
      line
    )

  return inputLines
    .map(line =>
      isCommentLine(line)
        ? line
        : replaceCodeWithStickers(line)
    )
    .join('\n')
}

const getInputLines = inputValue => inputValue.split('\n')

const isCommentLine = line => typeof line === 'string' && line[0] === '>'

const filterCommentLines = inputLines => inputLines.filter(line => !isCommentLine(line))

function getStickerMatches(value, separator) {
  const matchCleanRegExp = new RegExp(`${separator}(.*)${separator}`, 'gm')
  return (value.match(new RegExp(`${separator}[^\n${separator} ]+${separator}`, 'gm')) || [])
    .map(match => match.replace(matchCleanRegExp, '$1'))
}

export function fillInput({
  inputValue,
  cache,
  userStickers,
  separator
}) {
  const inputLines = getInputLines(inputValue)
  const matchs = getStickerMatches(
    filterCommentLines(inputLines).join('\n'),
    separator
  )
  if (matchs.length === 0) return;
  const getSavedSticker = makeGetSavedSticker(cache, userStickers, separator)
  const contentStickers = matchs
    .filter((match, i, arr) => arr.indexOf(match) === i)
    .map(match => ({
      url: getSavedSticker(match),
      code: match
    }))
    .filter(data => data.url != null)
  editor.value = replaceContentWithStickers(inputLines, contentStickers, separator)
}

export async function fillPreview({
  inputValue,
  cache,
  userStickers,
  separator
}) {
  const inputLines = getInputLines(inputValue)
  const matchs = getStickerMatches(
    filterCommentLines(inputLines).join('\n'),
    separator
  )
  const contentStickers = await getContentStickers(matchs, cache, userStickers, separator)
  const content = replaceContentWithStickers(inputLines, contentStickers, separator)
  const previewHTML = await getPreview(content)
  preview.innerHTML = previewHTML

  return contentStickers.filter(({ code }) => userStickers[code] === undefined && cache[code] === undefined)
}
