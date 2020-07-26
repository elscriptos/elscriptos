import style from '../style'
import classNames from 'classnames'

const Container = style('input')({
  outline: 'none',
  border: 'none',
  boxShadow: 'none',
  padding: '0.33rem 0.66rem',
  backgroundColor: 'rgba(18, 20, 22, 0.5)',
  borderRadius: '7px',
  transition: 'backgroundColor 0.3s',
  color: 'white',
  overflow: 'hidden',
  '&:focus': {
    backgroundColor: 'rgba(18, 20, 22, 1)'
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
