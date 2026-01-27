import { FileStyled } from '@/entries/Books/styles'
import { useStore } from '@/store/root.context'
import { IFile } from '@/types/File'

const File = (props: IFile) => {
  const { playerStore } = useStore()
  const { file, changeBook } = playerStore

  const lastPart = props.name.split('/')
  const title = lastPart.at(-1) ?? ''

  const clickHandler = () => {
    changeBook(props)
  }

  return (
    <FileStyled onClick={clickHandler} className={file === props._id ? 'active' : ''}>
      {title}
    </FileStyled>
  )
}
export default File
