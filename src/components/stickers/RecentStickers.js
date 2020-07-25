import { stateEvent } from '../../utils/event'
import style, { css } from '../style'
import StickerListItem from '../commons/StickerListItem'
import SectionHeader from '../commons/SectionHeader'
import StickerGrid from '../commons/StickerGrid'
import ModeSwitch from '../commons/ModeSwitch'

const Section = style('section')({
  display: 'flex',
  flex: '0',
  flexDirection: 'column'
})

const handleStickerClick = (code, url) => stateEvent(state => ({
  ...state,
  formMode: 'ajouter',
  stickerForm: {
    code,
    url
  }
}))

const renderSticker = ([code, url]) => 
    StickerListItem({
      code,
      url,
      onclick: handleStickerClick(code, url)
    })

const modes = [
  {
    id: 'recent',
    label: 'En cache',
    selectable: false
  }
]

const RecentStickers = ({
  cache = {}
}) => (
  Section(
    {},
    [
      SectionHeader(
        {},
        ModeSwitch({
          currentMode: 'recent',
          modes
        })
      ),
      StickerGrid(
        {},
        Object.entries(cache).map(renderSticker)
      )
    ]
  )
)

export default RecentStickers
