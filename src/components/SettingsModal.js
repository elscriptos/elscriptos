import { h, text, app } from 'hyperapp'
import style from './style'
import store from '../store'
import { simpleEvent } from '../utils/event'
import { Creators } from '../store/actionTypes'
import StickerList from './StickerList'
import StickerListHeader from './StickerListHeader'
import reduxSubscription from '../utils/reduxSubscription'

const container = document.createElement('div')
document.body.appendChild(container)

const Wrapper = style('div')({
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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

const Container = style('div')({
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)',
  borderRadius: '4px',
  maxWidth: 'calc(100vw - 1rem)',
  maxHeight: 'calc(100vh - 1rem)',
  backgroundColor: 'rgba(50, 50, 50, 0.9)',
  color: 'white',
  width: '800px',
  height: '800px',
  overflowY: 'hidden'
})

const cancelBubbling = simpleEvent()

const handleWrapperClick = simpleEvent(() => {
  store.dispatch(Creators.overlayToggled())
})

const SettingsModal = ({
  isOpen,
  stickers,
  addForm
}) => (
  h('div', {}, [
    isOpen && (
      Wrapper(
        {
          onclick: handleWrapperClick
        },
        Container(
          {
            onclick: cancelBubbling
          },
          [
            StickerListHeader({ addForm }),
            StickerList({ stickers })
          ]
        )
      )
    )
  ])
)

function mapStoreToState(storeState) {
  return {
    isOpen: storeState.isOverlayOpen,
    stickers: storeState.userStickers
  }
}

app({
  init: {
    isOpen: false,
    stickers: [],
    addForm: {
      code: '',
      url: ''
    }
  },
  view: SettingsModal,
  subscriptions: (state) => [
    [reduxSubscription(store, mapStoreToState), state]
  ],
  node: container
})
