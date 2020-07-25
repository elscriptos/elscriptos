import style, { css } from '../style'
import StickerListItem from '../commons/StickerListItem'
import SectionHeader from '../commons/SectionHeader'
import ModeSwitch from '../commons/ModeSwitch'
import StickerGrid from '../commons/StickerGrid'
import AddStickerForm from '../forms/AddStickerForm'
import { stateEvent } from '../../utils/event'

const Section = style('section')({
  display: 'flex',
  flex: '1',
  flexDirection: 'column'
})

const handleModeClick = stateEvent((state, _, mode) => ({
  ...state,
  formMode: mode.id,
  stickerForm: {
    code: '',
    lastCode: '',
    url: ''
  }
}))

const handleStickerClick = (code, url) => stateEvent(state => ({
  ...state,
  formMode: 'modifier',
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
      code,
      url,
      editing,
      onclick: handleStickerClick(code, url),
      overwriting: !editing && overwriting
    })
  }

const modes = [
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
  stickerForm,
  formMode
}) => (
  Section(
    {},
    [
      SectionHeader(
        {},
        [
          ModeSwitch({
            currentMode: formMode,
            onModeClick: handleModeClick,
            modes
          }),
          AddStickerForm({ ...stickerForm, formMode, stickers })
        ]
      ),
      StickerGrid(
        {},
        Object.entries(stickers).map(renderSticker(stickerForm))
      )
    ]
  )
)

export default UserStickers
