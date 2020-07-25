import style from '../style'
import classNames from 'classnames'

const Container = style('input')({
  outline: 'none',
  border: '1px solid #121212',
  boxShadow: 'none',
  padding: '0.33rem 0.66rem',
  backgroundColor: 'rgba(0, 0, 0, 0.35)',
  borderRadius: '4px',
  transition: 'backgroundColor 0.3s',
  color: 'white',
  overflow: 'hidden',
  '&:focus': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  '&.--warning': {
    borderColor: 'red'
  }
})

const TextInput = ({
  warning,
  ...rest
}) => (
  Container(
    {
      ...rest,
      class: classNames(
        rest.class,
        {
          '--warning': warning
        }
      ),
      type: 'text'
    }
  )
)

export default TextInput
