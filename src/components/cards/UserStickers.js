import style from '../style'
import StickerListItem from '../commons/StickerListItem'
import SectionHeader from '../commons/SectionHeader'
import ModeSwitch from '../commons/ModeSwitch'
import StickerGrid from '../commons/StickerGrid'
import AddStickerForm from '../forms/AddStickerForm'
import SearchStickersForm from '../forms/SearchStickersForm'
import { stateEvent } from '../../utils/event'

const Section = style('section')({
  display: 'flex',
  flex: '1',
  minHeight: '0',
  flexDirection: 'column'
})

const handleModeClick = stateEvent((state, _, mode) => ({
  ...state,
  stickerFormMode: mode.id,
  stickerForm: {
    code: '',
    lastCode: '',
    url: ''
  }
}))

const handleStickerClick = (code, url) => stateEvent(state => ({
  ...state,
  stickerFormMode: state.stickerFormMode === 'search' ? 'ajouter' : 'modifier',
  stickerForm: {
    lastCode: code,
    code,
    url
  }
}))

const renderSticker = (stickerForm) =>
  ([code, url]) => {
    const editing = stickerForm.lastCode === code
    const overwriting = stickerForm.code === code
    return StickerListItem({
      key: code,
      code,
      url,
      editing,
      onclick: handleStickerClick(code, url),
      overwriting: !editing && overwriting
    })
  }

const renderSearchSticker = ({ risibank_link: url }) => 
  StickerListItem({
    key: url,
    code: '',
    url,
    onclick: handleStickerClick('', url)
  })

const modes = [
  {
    id: 'search',
    label: 'Rechercher',
    selectable: true
  },
  {
    id: 'ajouter',
    label: 'Ajouter',
    selectable: true
  },
  {
    id: 'modifier',
    label: 'Modifier',
    selectable: false
  }
]

const UserStickers = ({
  stickers = {},
  searchStickers = [],
  stickerForm,
  searchForm,
  stickerFormMode
}) => (
  Section(
    {},
    [
      SectionHeader(
        {},
        [
          ModeSwitch({
            currentMode: stickerFormMode,
            onModeClick: handleModeClick,
            modes
          }),
          stickerFormMode === 'search'
            ? SearchStickersForm({ searchForm })
            : AddStickerForm({ ...stickerForm, stickerFormMode, stickers })
        ]
      ),
      StickerGrid(
        {},
        stickerFormMode === 'search'
          ? searchStickers.map(renderSearchSticker)
          : Object.entries(stickers).map(renderSticker(stickerForm))
      )
    ]
  )
)

export default UserStickers
