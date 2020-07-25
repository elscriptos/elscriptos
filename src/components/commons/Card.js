import style from '../style'

const Card = style('div')({
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)',
  borderRadius: '4px',
  maxWidth: 'calc(100vw - 1rem)',
  maxHeight: 'calc(100vh - 1rem)',
  backgroundColor: 'rgba(50, 50, 50, 0.9)',
  color: 'white',
  width: '100%',
  height: '100%',
  overflowY: 'hidden'
})

export default Card
