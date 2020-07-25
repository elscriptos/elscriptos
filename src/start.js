import { debounce } from 'debounce'
import {
  editor,
  preview,
  postButton,
  previewToggle
} from './services/elements'
import config from './config'
import store from './store'
import { Creators } from './store/actionTypes'

function registerRisibankPatch() {
  const handleDocumentClick = e => {
    if (!e.target.classList.contains('risi-img')) return;
    store.dispatch(Creators.risibankStickerAdded())
  }
  document.addEventListener('click', handleDocumentClick)
}

function registerPostPatch() {
  const handlePostButtonClick = () => store.dispatch(Creators.postButtonClicked())
  postButton.addEventListener('mousedown', handlePostButtonClick)
}

function registerInputChange() {
  const handleChange = debounce(
    e => store.dispatch(Creators.inputChanged(e.target.value)),
    config.inputDebounceDuration
  )
  editor.addEventListener('input', handleChange)
  editor.addEventListener('change', handleChange)
}

function disableJVCPreview() {
  if (previewToggle.classList.contains('active')) {
    const event = new CustomEvent('click')
    previewToggle.dispatchEvent(event)
  }
  previewToggle.disabled = true
  preview.style.display = 'block'
}

export default function start() {
  registerRisibankPatch()
  registerPostPatch()
  registerInputChange()
  disableJVCPreview()
}
