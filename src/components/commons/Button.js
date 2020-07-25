import { h } from 'hyperapp'
import style from '../style'

const Container = style('button')({
  position: 'relative',
  outline: 'none',
  border: '1px solid #121212',
  boxShadow: 'none',
  padding: '0.33rem 0.66rem',
  backgroundColor: 'transparent',
  borderRadius: '4px',
  overflow: 'hidden',
  'a:disabled': {
    opacity: '0.5'
  },
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    backgroundColor: 'transparent',
    transition: 'background-color 0.3s',
    zIndex: '0',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
  },
  '& > span': {
    zIndex: '2',
    position: 'relative'
  },
  '&:after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: '1',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(0)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '150%',
    height: '0px',
    paddingBottom: '150%',
    opacity: '0',
    borderRadius: '50%',
    transition: 'all 0.2s'
  },
  '&:hover': {
    cursor: 'pointer',
  },
  '&:hover::before': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  '&:active::after': {
    transform: 'translate(-50%, -50%) scale(1)',
    opacity: '1',
  }
})

const Button = (props, children) => (
  Container(
    props,
    h('span', {}, children)
  )
)

export default Button
