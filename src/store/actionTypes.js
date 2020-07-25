
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


const overlayToggled = () => ({
  type: Types.OVERLAY_TOGGLED
})

// APP

const hydrated = (payload) => ({
  type: Types.HYDRATED,
  payload
})

// MODAL

const userStickerAdded = (code, url) => ({
  type: Types.USER_STICKER_ADDED,
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
  // MODAL
  USER_STICKER_ADDED: 'USER_STICKER_ADDED',
}

export const Creators = {
  inputChanged,
  risibankStickerAdded,
  postButtonClicked,
  overlayToggled,
  // app
  hydrated,
  // MODAL
  userStickerAdded
}
