import UserStore from '@/store/UserStore'
import { FileStyled } from '@/entries/Books/styles'

const File = (props) => {
  const { setSelected, setFile, file } = UserStore
  let name = props.name.split('/')
  if (name.length <= 1) {
    name = name.join('/')
  } else {
    name.shift()
  }

  const clickHandler = () => {
    setSelected(props.name)
    setFile(props._id)
  }

  return (
    <FileStyled onClick={clickHandler} className={file === props._id ? 'active' : ''}>
      {name}
    </FileStyled>
  )
}
export default File
