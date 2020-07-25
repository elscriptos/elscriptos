import { Types, Creators } from './actionTypes'
import { editor } from '../services/elements'
import { fillPreview, fillInput } from '../services/input'
import callEach from '../utils/callEach'
import { saveCache } from '../services/persistence'
import userSticker from '../models/userSticker'

function handleRisibankStickerAdded(store) {
  const { value } = editor
  const { inputValue } = store.getState()
  if (inputValue !== value) {
    store.dispatch(Creators.inputChanged(value)) 
  }
}

function handleInputChanged(store) {
  fillPreview(store.getState())
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
