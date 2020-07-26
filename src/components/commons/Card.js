import style from '../style'

const Card = style('div')({
  display: 'flex',
  flexDirection: 'column',
  border: '1px dashed #434447',
  borderRadius: '7px',
  maxWidth: 'calc(100vw - 1rem)',
  maxHeight: 'calc(100vh - 1rem)',
  padding: '0.5rem',
  color: 'white',
  width: '100%',
  height: '100%',
  overflowY: 'hidden'
})

export default Card
