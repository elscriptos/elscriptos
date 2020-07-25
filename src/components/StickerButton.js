import { h, text, app } from 'hyperapp'
import store from '../store'
import { Creators } from '../store/actionTypes'

const toolbar = document.querySelector('.jv-editor-toolbar')
const buttonGroup = document.createElement('div')
const container = document.createElement('div')
buttonGroup.appendChild(container)
buttonGroup.classList.add('btn-group')
toolbar.appendChild(buttonGroup)

function handleClick(_, event) {
  event.stopPropagation()
  event.preventDefault()
  store.dispatch(Creators.overlayToggled())
}

const StickerButton = () =>
  h(
    'button',
    {
      className: 'btn btn-jv-editor-toolbar',
      onclick: handleClick
    },
    text('Stickers')
  )

app({
  init: {},
  view: StickerButton,
  node: container
})
