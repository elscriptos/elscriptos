import { h, text } from 'hyperapp'
import style from '../style'
import store from '../../store'
import { stateStoreEvent, stateEvent } from '../../utils/event'
import { Creators } from '../../store/actionTypes'
import Button from '../commons/Button'
import TextInput from '../commons/TextInput'

const Container = style('div')({
  display: 'flex',
  flexDirection: 'row',
})

const handleAddSticker = stateStoreEvent(
  (state) => ({
    ...state,
    addForm: {
      code: '',
      url: ''
    }
  }),
  (state) => store.dispatch(Creators.userStickerAdded(state.addForm.code, state.addForm.url))
)

const handleCodeChange = stateEvent((state, event) => ({
  ...state,
  addForm: {
    ...state.addForm,
    code: event.target.value
  }
}))

const handleUrlChange = stateEvent((state, event) => ({
  ...state,
  addForm: {
    ...state.addForm,
    url: event.target.value
  }
}))

const StickerListHeader = ({
  code,
  url
}) => (
  Container(
    {},
    [
      TextInput(
        {
          placeholder: 'code',
          size: '8',
          oninput: handleCodeChange,
          value: code
        }
      ),
      TextInput(
        {
          placeholder: 'url',
          size: '30',
          oninput: handleUrlChange,
          value: url
        }
      ),
      Button(
        {
          onclick: handleAddSticker
        },
        text('Ajouter')
      )
    ]
  )
)

export default StickerListHeader
