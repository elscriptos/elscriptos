import { h, text } from 'hyperapp'
import style from './style'
import store from '../store'
import StickerListItem from './StickerListItem'

const Wrapper = style('div')({
  flex: '1',
  flex: '1 1 100%',
  overflowY: 'auto',
})

const Container = style('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(6.5rem, 1fr))',
  gridGap: '0.65rem',
  padding: '0.65rem',
  gridAutoRows: '1fr',
  '&::before': {
    content: '""',
    width: '0',
    paddingBottom: '75%',
    gridRow: '1 / 1',
    gridColumn: '1 / 1'
  },
  '& > *:first-child': {
    gridRow: '1 / 1',
    gridColumn: '1 / 1'
  }
})

const renderSticker = sticker => StickerListItem(sticker)

const StickerList = ({ stickers = [] }) => (
  Wrapper(
    {},
    Container(
      {},
      stickers.map(renderSticker)
    )
  )
)

export default StickerList
