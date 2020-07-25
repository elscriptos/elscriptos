import style from '../style'

const Container = style('header')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '0.5rem',
  justifyContent: 'space-between',
  background: 'rgb(61,9,121)',
  background: 'linear-gradient(90deg, rgba(61,9,121,0.85) 16%, rgba(55,0,255,0.85) 100%)',
})

const SectionHeader = (props, children) => 
  Container(
    props,
    children
  )

export default SectionHeader
