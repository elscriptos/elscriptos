import { h, app } from 'hyperapp'
import style, { css } from './style'
import store from '../store'
import { simpleEvent } from '../utils/event'
import { Creators } from '../store/actionTypes'
import UserStickers from './stickers/UserStickers'
import reduxSubscription from '../utils/reduxSubscription'
import RecentStickers from './stickers/RecentStickers'
import Card from './commons/Card'
import { createMetaStickers } from '../services/stickers'
import MetaStickers from './stickers/MetaStickers'

const container = document.createElement('div')
document.body.appendChild(container)

const Wrapper = style('div')({
  position: 'fixed',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(2, 1fr)',
  gridGap: '1rem',
  padding: '4rem 6rem ',
  top: '0',
  left: '0',
  zIndex: '1999999999',
  height: '100vh',
  width: '100%',
  backdropFilter: 'blur(5px)',
  backgroundColor: 'rgba(30, 32, 37, 0.95)',
  '&:hover': {
    cursor: 'zoom-out'
  },
  '&:hover > *': {
    cursor: 'auto'
  }
})

const UserStickersClass = css({
  gridColumn: '1 / 4'
})

const RecentStickersClass = css({
  gridColumn: '1'
})

const MetaStickersClass = css({
  gridColumn: '2 / 4'
})

const cancelBubbling = simpleEvent()

const handleWrapperClick = simpleEvent(() => {
  store.dispatch(Creators.overlayToggled())
})

const SettingsOverlay = ({
  isOpen,
  stickers,
  stickerForm,
  metaStickers,
  metaMode,
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
              onclick: cancelBubbling,
              class: RecentStickersClass
            },
            RecentStickers({ cache })
          ),
          Card(
            {
              onclick: cancelBubbling,
              class: MetaStickersClass
            },
            MetaStickers({ metaStickers, metaMode })
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
    metaStickers: storeState.metaStickers,
    cache: storeState.cache
  }
}

app({
  init: {
    isOpen: false,
    stickers: [],
    metaStickers: createMetaStickers(),
    formMode: 'ajouter',
    metaMode: 'trending',
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
