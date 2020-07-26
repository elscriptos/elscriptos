import style from '../style'

const Wrapper = style('div')({
  flex: '1 1 100%',
  minHeight: '0',
  overflowY: 'auto'
})

const Grid = style('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(6.5rem, 1fr))',
  gridGap: '0.65rem',
  padding: '0.65rem',
  gridAutoRows: '1fr',
  '&::before': {
    content: '""',
    width: '0',
    paddingBottom: '75%',
    gridRow: '1 / 1',
    gridColumn: '1 / 1'
  },
  '& > *:first-child': {
    gridRow: '1 / 1',
    gridColumn: '1 / 1'
  }
})

const StickerGrid = (props, children) => (
  Wrapper(
    props,
    Grid(
      {},
      children
    )
  )
)

export default StickerGrid
