import { Types, Creators } from './actionTypes'
import { editor } from '../services/elements'
import { fillPreview, fillInput } from '../services/input'
import { setFromObject } from '../utils/object'
import { getMetaStickers, getStickers } from '../services/stickers'

function handleRisibankStickerAdded(store) {
  const { value } = editor
  const { inputValue } = store.getState()
  if (inputValue !== value) {
    store.dispatch(Creators.inputChanged(value)) 
  }
}

async function handleInputChanged(store) {
  const fetchedStickers = await fillPreview(store.getState())
  const partialCache = fetchedStickers
    .reduce((acc, data) =>
      setFromObject(acc, data.code, data.url),
      {})
  store.dispatch(Creators.partialCacheAdded(partialCache))
}

function handlePostButtonClicked(store) {
  fillInput(store.getState())
}

async function handleOverlayToggled(store) {
  const metaStickers = await getMetaStickers()
  store.dispatch(Creators.metaStickersLoaded(metaStickers))
}

async function handleSearchQueryChanged(store, { query }) {
  console.log('query', query)
  const stickers = await getStickers(query)
  store.dispatch(Creators.searchStickersChanged(stickers))
}

const handlers = {
  [Types.RISIBANK_STICKER_ADDED]: handleRisibankStickerAdded,
  [Types.INPUT_CHANGED]: handleInputChanged,
  [Types.POST_BUTTON_CLICKED]: handlePostButtonClicked,
  [Types.OVERLAY_TOGGLED]: handleOverlayToggled,
  [Types.SEARCH_QUERY_CHANGED]: handleSearchQueryChanged
}

export default store => next => action => {
  next(action)
  const handler = handlers[action.type]
  if (typeof handler === 'function') {
    handler(store, action)
  }
}
