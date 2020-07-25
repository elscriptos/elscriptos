import config from '../config'

import { Types } from './actionTypes'
import userSticker from '../models/userSticker'

const INITIAL_STATE = {
  cache: new Map(), // will mutate for performance reason, persistence will still work
  userStickers: [],
  inputValue: '',
  isOverlayOpen: false,
  separator: config.separator
}

export default function reducer(
  state = INITIAL_STATE,
  action
) {
  switch (action.type) {
    case Types.INPUT_CHANGED:
      return { ...state, inputValue: action.value }
    case Types.HYDRATED:
      return { ...state, ...action.payload }
    case Types.OVERLAY_TOGGLED:
      return { ...state, isOverlayOpen: !state.isOverlayOpen }
    case Types.USER_STICKER_ADDED:
      return {
        ...state,
        userStickers: [
          ...state.userStickers,
          userSticker(action.code, action.url)
        ]
      }
    default:
      return state
  }
}
