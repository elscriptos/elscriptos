import { h, text } from 'hyperapp'
import style from './style'
import store from '../store'

const Container = style('div')({
  display: 'flex',
  position: 'relative',
  flexDirection: 'row',
  border: '1px solid #222',
  backgroundColor: 'white',
  borderRadius: '4px',
  '&:hover > span': {
    opacity: '0'
  }
})

const Image = style('img')({
  position: 'absolute',
  top: '0',
  left: '0',
  bottom: '0',
  right: '0',
  width: '100%',
  height: '100%',
  zIndex: '0'
})

const Label = style('span')({
  position: 'absolute',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  textAlign: 'center',
  color: 'white',
  transition: 'opacity 0.3s',
  bottom: '0',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  left: '0',
  right: '0',
  padding: '0.1rem 0.25rem',
  zIndex: '1'
})

const StickerListItem = ({
  code,
  url
}) => (
  Container(
    {},
    [
      Image({
        src: url
      }),
      Label({}, text(code))
    ]
  )
)

export default StickerListItem
