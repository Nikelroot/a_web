import UserStore from '@/store/UserStore'
import { FileStyled } from '@/entries/Books/styles'

const File = (props) => {
  const { setSelected, setFile, file } = UserStore
  const name = props.name.split('/')
  name.shift()

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
