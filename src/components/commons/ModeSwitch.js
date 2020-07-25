import { text } from 'hyperapp'
import classNames from 'classnames'
import style from '../style'
import { stateEvent, simpleEvent } from '../../utils/event'

const Container = style('div')({
  display: 'flex',
  alignItems: 'flex-end',
  height: 'fit-content',
  padding: '0 0.5rem',
})

const ModeButton = style('button')({
  '-webkit-appearance': 'none',
  '-moz-appearance': 'none',
  backgroundColor: 'transparent',
  outline: 'none',
  border: 'none',
  color: 'white',
  fontWeight: '300',
  fontSize: '1.25rem',
  transition: 'all 0.3s',
  display: 'inline-flex',
  alignItems: 'flex-end',
  opacity: '0.5',
  transform: 'scale(0.65)',
  '&.--selected': {
    opacity: '0.9',
    transform: 'scale(1)'
  },
  '&.--selected:hover': {
    cursor: 'default'
  },
  '&.--always-disabled:hover':{
    cursor: 'default',
  },
  '&.--disabled:hover': {
    cursor: 'default',
    opacity: '1'
  },
  '&.--enabled': {
    opacity: '1'
  },
  '&:hover': {
    cursor: 'pointer',
  }
})

const ModeSwitch = ({
  currentMode,
  modes,
  onModeClick,
  ...rest
} = {}) => (
  Container(
    {
      ...rest,
    },
    modes.map(mode =>
      ModeButton(
        {
          disabled: mode.id === currentMode || !mode.selectable,
          onclick: (state, event) => onModeClick(state, event, mode),
          class: mode.id === currentMode
            ? classNames('--disabled', '--selected')
            : mode.selectable ? '--enabled' : '--always-disabled'
        },
        text(mode.label)
      )
    )
  )
)

export default ModeSwitch
