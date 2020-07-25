import { h, text } from 'hyperapp'
import style from './style'
import store from '../store'
import { simpleEvent } from '../utils/event'
import { Creators } from '../store/actionTypes'
import AddStickerForm from './forms/AddStickerForm'

const Container = style('header')({
  display: 'flex',
  flexDirection: 'row',
  padding: '0.5rem',
  borderBottom: '1px solid #222',
  background: 'rgb(61,9,121)',
  background: 'linear-gradient(90deg, rgba(61,9,121,0.85) 16%, rgba(55,0,255,0.85) 100%)',
  '&:last-of-type': {
    borderBottom: '0'
  }
})

const handleAddSticker = simpleEvent(() => {

  store.dispatch(Creators.userStickerAdded())
})

const StickerListHeader = ({
  addForm
}) => (
  Container(
    {},
    [
      AddStickerForm(addForm)
    ]
  )
)

export default StickerListHeader
