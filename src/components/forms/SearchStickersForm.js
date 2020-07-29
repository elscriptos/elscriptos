import { debounce } from 'debounce'
import style, { css } from '../style'
import { stateStoreEvent } from '../../utils/event'
import { Creators } from '../../store/actionTypes'
import TextInput from '../commons/TextInput'
import store from '../../store'

const Container = style('div')({
  display: 'flex',
  flexDirection: 'row',
  flexShrink: '1',
  flexWrap: 'nowrap'
})

const QueryInputClass = css({
  maxWidth: '15rem'
})

const handleQueryChange = stateStoreEvent(
  (state, event) => ({
    ...state,
    searchForm: {
      ...state.stickerForm,
      query: event.target.value
    }
  }),
  debounce((_, event) =>
    store.dispatch(Creators.searchQueryChanged(event.target.value)),
    500
  )
)

const SearchStickersForm = ({
  searchForm
}) => (
  Container(
    {},
    [
      TextInput(
        {
          placeholder: 'recherche',
          oninput: handleQueryChange,
          class: QueryInputClass,
          value: searchForm.query
        }
      )
    ]
  )
)

export default SearchStickersForm
