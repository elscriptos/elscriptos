import { h, app } from 'hyperapp'
import style, { css } from './style'
import store from '../store'
import { simpleEvent } from '../utils/event'
import { Creators } from '../store/actionTypes'
import UserStickers from './stickers/UserStickers'
import reduxSubscription from '../utils/reduxSubscription'
import RecentStickers from './stickers/RecentStickers'
import Card from './commons/Card'

const container = document.createElement('div')
document.body.appendChild(container)

const Wrapper = style('div')({
  position: 'fixed',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'repeat(2, 1fr)',
  gridGap: '3rem',
  padding: '4rem 6rem ',
  top: '0',
  left: '0',
  zIndex: '1999999999',
  height: '100vh',
  width: '100%',
  backdropFilter: 'blur(5px)',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  '&:hover': {
    cursor: 'zoom-out'
  },
  '&:hover > *': {
    cursor: 'auto'
  }
})

const UserStickersClass = css({
  gridColumn: '1 / 3'
})

const cancelBubbling = simpleEvent()

const handleWrapperClick = simpleEvent(() => {
  store.dispatch(Creators.overlayToggled())
})

const SettingsOverlay = ({
  isOpen,
  stickers,
  stickerForm,
  cache,
  formMode
}) => (
  h('div', {}, [
    isOpen && (
      Wrapper(
        {
          onclick: handleWrapperClick
        },
        [
          Card(
            {
              onclick: cancelBubbling,
              class: UserStickersClass
            },
            UserStickers({ stickers, stickerForm, formMode })
          ),
          Card(
            {
              onclick: cancelBubbling
            },
            RecentStickers({ cache })
          )
        ]
      )
    )
  ])
)

function mapStoreToState(storeState) {
  return {
    isOpen: storeState.isOverlayOpen,
    stickers: storeState.userStickers,
    cache: storeState.cache
  }
}

app({
  init: {
    isOpen: false,
    stickers: [],
    formMode: 'ajouter',
    stickerForm: {
      lastCode: '',
      code: '',
      url: ''
    }
  },
  view: SettingsOverlay,
  subscriptions: (state) => [
    [reduxSubscription(store, mapStoreToState), state]
  ],
  node: container
})
