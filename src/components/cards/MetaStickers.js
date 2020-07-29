import { stateEvent } from '../../utils/event'
import style, { css } from '../style'
import StickerListItem from '../commons/StickerListItem'
import SectionHeader from '../commons/SectionHeader'
import StickerGrid from '../commons/StickerGrid'
import ModeSwitch from '../commons/ModeSwitch'

const Section = style('section')({
  display: 'flex',
  flex: '1',
  minHeight: '0',
  flexDirection: 'column'
})

const handleStickerClick = (code, url) => stateEvent(state => ({
  ...state,
  stickerFormMode: 'ajouter',
  stickerForm: {
    code,
    url
  }
}))

const handleModeClick = stateEvent((state, _, mode) => ({
  ...state,
  metaMode: mode.id
}))

const renderSticker = ({ risibank_link: url }) => 
    StickerListItem({
      key: url,
      code: '',
      url,
      onclick: handleStickerClick('', url)
    })

const modes = [
  {
    id: 'recent',
    label: 'Nouveautés',
    selectable: true
  },
  {
    id: 'trending',
    label: 'Populaires',
    selectable: true
  },
  {
    id: 'random',
    label: 'Aléatoires',
    selectable: true
  }
]

const MetaStickers = ({
  metaStickers,
  metaMode
}) => (
  Section(
    {},
    [
      SectionHeader(
        {},
        ModeSwitch({
          currentMode: metaMode,
          onModeClick: handleModeClick,
          modes
        })
      ),
      StickerGrid(
        {},
        (metaStickers[metaMode] || []).map(renderSticker)
      )
    ]
  )
)

export default MetaStickers
