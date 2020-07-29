import { stateEvent } from '../../utils/event'
import style from '../style'
import SectionHeader from '../commons/SectionHeader'
import ModeSwitch from '../commons/ModeSwitch'
import { text } from 'hyperapp'

const Section = style('section')({
  display: 'flex',
  flex: '1',
  minHeight: '0',
  flexDirection: 'column'
})

const handleModeClick = stateEvent((state, _, mode) => ({
  ...state,
  settingsMode: mode.id
}))

const modes = [
  {
    id: 'presets',
    label: 'Presets',
    selectable: true
  },
  {
    id: 'options',
    label: 'Options',
    selectable: true
  }
]

const Settings = ({
  settingsMode
}) => (
  Section(
    {},
    [
      SectionHeader(
        {},
        ModeSwitch({
          currentMode: settingsMode,
          onModeClick: handleModeClick,
          modes
        })
      ),
      text(settingsMode)
    ]
  )
)

export default Settings
