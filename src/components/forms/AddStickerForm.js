import { h, text } from 'hyperapp'
import classNames from 'classnames'
import style, { css } from '../style'
import store from '../../store'
import { stateStoreEvent, stateEvent } from '../../utils/event'
import { Creators } from '../../store/actionTypes'
import Button from '../commons/Button'
import TextInput from '../commons/TextInput'

const Container = style('div')({
  display: 'flex',
  flexDirection: 'row',
  flexShrink: '1',
  '& > *': {
    marginRight: '0.5rem'
  },
  '& > *:last-child': {
    marginRight: '0'
  },
  flexWrap: 'nowrap'
})

const InputClass = css({
  flexShrink: '1',
  minWidth: '0',
  width: '100%'
})

const CodeInputClass = css({
  maxWidth: '6rem'
})

const UrlInputClass = css({
  maxWidth: '15rem'
})

const ButtonClass = css({
  flexShrink: '0'
})

const handleAddSticker = stateStoreEvent(
  state => ({
    ...state,
    stickerForm: {
      lastCode: '',
      code: '',
      url: ''
    }
  }),
  state => store.dispatch(Creators.userStickerAdded(state.stickerForm.code, state.stickerForm.url))
)

const handleRemoveSticker = stateStoreEvent(
  state => ({
    ...state,
    stickerFormMode: 'ajouter',
    stickerForm: {
      lastCode: '',
      code: '',
      url: ''
    }
  }),
  ({ stickerForm : { lastCode }}) => store.dispatch(Creators.userStickerRemoved(lastCode))
)

const handleEditSticker = stateStoreEvent(
  state => ({
    ...state,
    stickerFormMode: 'ajouter',
    stickerForm: {
      lastCode: '',
      code: '',
      url: ''
    }
  }),
  ({ stickerForm : { lastCode, code, url }}) => store.dispatch(Creators.userStickerEdited(lastCode, code, url))
)

const handleCodeChange = stateEvent((state, event) => ({
  ...state,
  stickerForm: {
    ...state.stickerForm,
    code: event.target.value
  }
}))

const handleUrlChange = stateEvent((state, event) => ({
  ...state,
  stickerForm: {
    ...state.stickerForm,
    url: event.target.value
  }
}))

const AddStickerForm = ({
  lastCode,
  code,
  url,
  stickers,
  stickerFormMode
}) => (
  Container(
    {},
    [
      TextInput(
        {
          placeholder: 'code',
          warning: code !== lastCode && stickers[code] !== undefined,
          oninput: handleCodeChange,
          class: classNames(InputClass, CodeInputClass),
          value: code
        }
      ),
      TextInput(
        {
          placeholder: 'url',
          oninput: handleUrlChange,
          class: classNames(InputClass, UrlInputClass),
          value: url
        }
      ),
      stickerFormMode === 'modifier' &&
        Button(
          {
            class: ButtonClass,
            warning: true,
            onclick: handleRemoveSticker
          },
          text('Suprimer')
        ),
      Button(
        {
          class: ButtonClass,
          primary: true,
          onclick: stickerFormMode === 'modifier' ? handleEditSticker : handleAddSticker
        },
        text(stickerFormMode === 'modifier' ? 'Modifier' : 'Ajouter')
      )
    ]
  )
)

export default AddStickerForm
