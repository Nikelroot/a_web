import { FileStyled } from '@/entries/Books/styles'
import { useStore } from '@/store/root.context'

const File = (props) => {
  const { playerStore } = useStore()
  const { file, changeBook } = playerStore

  let name = props.name.split('/')
  if (name.length <= 1) {
    name = name.join('/')
  } else {
    name.shift()
  }

  const clickHandler = () => {
    changeBook(props)
  }

  return (
    <FileStyled onClick={clickHandler} className={file === props._id ? 'active' : ''}>
      {name}
    </FileStyled>
  )
}
export default File
