import { Types, Creators } from './actionTypes'
import { editor } from '../services/elements'
import { fillPreview, fillInput } from '../services/input'
import { setFromObject } from '../utils/object'

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

const handlers = {
  [Types.RISIBANK_STICKER_ADDED]: handleRisibankStickerAdded,
  [Types.INPUT_CHANGED]: handleInputChanged,
  [Types.POST_BUTTON_CLICKED]: handlePostButtonClicked
}

export default store => next => action => {
  next(action)
  const handler = handlers[action.type]
  if (typeof handler === 'function') {
    handler(store, action)
  }
}
