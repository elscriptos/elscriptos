import config from '../config'

import { Types } from './actionTypes'
import { removeFromObject, setFromObject } from '../utils/object'
import { createMetaStickers } from '../services/stickers'

const INITIAL_STATE = {
  cache: {},
  userStickers: {},
  metaStickers: createMetaStickers(),
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
        userStickers: setFromObject(state.userStickers, action.code, action.url)
      }
    case Types.USER_STICKER_REMOVED:
      return {
        ...state,
        userStickers: removeFromObject(state.userStickers, action.code)
      }
    case Types.USER_STICKER_EDITED:
      return {
        ...state,
        userStickers: setFromObject(
          removeFromObject(state.userStickers, action.lastCode),
          action.code,
          action.url
        )
      }
    case Types.PARTIAL_CACHE_ADDED:
      const nextCache = {
        ...action.partialCache,
        ...state.cache
      }
      return {
        ...state,
        cache: Object
          .keys(nextCache)
          .slice(0, config.maxCacheSize)
          .reduce((acc, key) =>
            setFromObject(acc, key, nextCache[key]),
            {}
          )
      }
    case Types.META_STICKERS_LOADED:
      return {
        ...state,
        metaStickers: action.metaStickers
      }
    default:
      return state
  }
}
