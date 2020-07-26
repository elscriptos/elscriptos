import { h } from 'hyperapp'
import classNames from 'classnames'
import style from '../style'

const Container = style('button')({
  position: 'relative',
  outline: 'none',
  boxShadow: 'none',
  border: 'none',
  padding: '0.33rem 0.66rem',
  backgroundColor: 'rgba(18, 20, 22, 0.5)',
  borderRadius: '7px',
  overflow: 'hidden',
  userSelect: 'none',
  '&.--primary': {
    backgroundColor: 'rgba(0, 50, 102, 0.5)'
  },
  '&.--warning': {
    backgroundColor: 'rgba(102, 20, 0, 0.5)'
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
    backgroundColor: 'rgba(9, 10, 11, 1)',
    width: '150%',
    height: '0px',
    paddingBottom: '150%',
    opacity: '0',
    borderRadius: '50%',
    transition: 'all 0.2s'
  },
  '&.--primary:after': {
    backgroundColor: 'rgba(0, 25, 51, 1)'
  },
  '&.--warning:after': {
    backgroundColor: 'rgba(51, 10, 0, 1)'
  },
  '&:hover': {
    cursor: 'pointer',
  },
  '&:hover::before': {
    backgroundColor: 'rgba(18, 20, 22, 1)',
  },
  '&.--primary:hover::before': {
    backgroundColor: 'rgba(0, 50, 102, 1)'
  },
  '&.--warning:hover::before': {
    backgroundColor: 'rgba(102, 20, 0, 1)'
  },
  '&:active::after': {
    transform: 'translate(-50%, -50%) scale(1)',
    opacity: '1',
  }
})

const Button = ({
  primary,
  warning,
  ...rest
}, children) => (
  Container(
    {
      ...rest,
      class: classNames(rest.class, {
        '--primary': primary,
        '--warning': warning
      })
    },
    h('span', {}, children)
  )
)

export default Button
