
const inputChanged = value => ({
  type: Types.INPUT_CHANGED,
  value
})

const risibankStickerAdded = () => ({
  type: Types.RISIBANK_STICKER_ADDED
})

const postButtonClicked = () => ({
  type: Types.POST_BUTTON_CLICKED
})

const metaStickersLoaded = (metaStickers) => ({
  type: Types.META_STICKERS_LOADED,
  metaStickers
})

const overlayToggled = () => ({
  type: Types.OVERLAY_TOGGLED
})

// APP

const hydrated = (payload) => ({
  type: Types.HYDRATED,
  payload
})

const partialCacheAdded = (partialCache) => ({
  type: Types.PARTIAL_CACHE_ADDED,
  partialCache
})

// MODAL

const userStickerAdded = (code, url) => ({
  type: Types.USER_STICKER_ADDED,
  code,
  url
})

const userStickerRemoved = code => ({
  type: Types.USER_STICKER_REMOVED,
  code
})

const userStickerEdited = (lastCode, code, url) => ({
  type: Types.USER_STICKER_EDITED,
  lastCode,
  code,
  url
})

export const Types = {
  // UI
  INPUT_CHANGED: 'INPUT_CHANGED',
  RISIBANK_STICKER_ADDED: 'RISIBANK_STICKER_ADDED',
  POST_BUTTON_CLICKED: 'POST_BUTTON_CLICKED',
  OVERLAY_TOGGLED: 'OVERLAY_TOGGLED',
  // APP
  HYDRATED: 'HYDRATED',
  PARTIAL_CACHE_ADDED: 'PARTIAL_CACHE_ADDED',
  // MODAL
  USER_STICKER_ADDED: 'USER_STICKER_ADDED',
  USER_STICKER_REMOVED: 'USER_STICKER_REMOVED',
  USER_STICKER_EDITED: 'USER_STICKER_EDITED',
  META_STICKERS_LOADED: 'META_STICKERS_LOADED',
}

export const Creators = {
  inputChanged,
  risibankStickerAdded,
  postButtonClicked,
  overlayToggled,
  // app
  hydrated,
  partialCacheAdded,
  // MODAL
  userStickerAdded,
  userStickerRemoved,
  userStickerEdited,
  metaStickersLoaded
}
