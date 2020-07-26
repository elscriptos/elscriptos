import { text } from 'hyperapp'
import classNames from 'classnames'
import style from '../style'

const Wrapper = style('div')({
  padding: '2px',
  borderRadius: '7px',
  background: 'transparent',
  transition: 'background 0.3s',
  '&.--overwriting': {
    backgroundColor: 'red'
  },
  '&.--editing': {
    backgroundColor: 'orange'
  },
  '&:hover': {
    background: 'linear-gradient(90deg, rgba(61,9,121,0.85) 16%, rgba(55,0,255,0.85) 100%)',
    cursor: 'pointer'
  }
})

const Container = style('div')({
  display: 'flex',
  position: 'relative',
  flexDirection: 'row',
  overflow: 'hidden',
  height: '100%',
  width: '100%',
  backgroundColor: 'white',
  borderRadius: '7px',
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
  url,
  editing = false,
  overwriting = false,
  ...rest
}) => (
  Wrapper(
    {
      class: classNames({
        '--editing': editing,
        '--overwriting': overwriting
      })
    },
    Container(
      rest,
      [
        Image({
          src: url
        }),
        code && Label({}, text(code))
      ]
    )
  )
)

export default StickerListItem
