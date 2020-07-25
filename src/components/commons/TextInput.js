import style from '../style'

const Container = style('input')({
  outline: 'none',
  border: '1px solid #222',
  boxShadow: 'none',
  padding: '0.33rem 0.66rem',
  backgroundColor: 'transparent',
  borderRadius: '4px',
  transition: 'backgroundColor 0.3s',
  color: 'white',
  overflow: 'hidden',
  '&:focus': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
})

const TextInput = props => (
  Container(
    {
      ...props,
      type: 'text'
    }
  )
)

export default TextInput
