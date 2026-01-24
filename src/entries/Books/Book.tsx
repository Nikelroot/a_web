import File from './File'
import { BookStyled } from '@/entries/Books/styles'
import UserStore from '@/store/UserStore'
import { observer } from 'mobx-react'
import { useCallback, useMemo } from 'react'
import { Button, Progress } from 'antd'
import apiService from '@/services/apiService'
import { DeleteOutlined } from '@ant-design/icons'
import LibraryStore from '@/store/LibraryStore'

const Book = (props) => {
  const { files = [], progress = 0, _id } = props
  const { file } = UserStore
  const { loadBooks } = LibraryStore
  const { removeFromLibrary } = apiService

  const ids = useMemo(() => {
    return files.map((f) => f._id)
  }, [files])

  const clickHandler = useCallback(() => {
    removeFromLibrary({
      action: 'REMOVE_TO_LIBRARY',
      payload: {
        forumId: _id,
      },
    }).then(loadBooks)
  }, [])

  return (
    <BookStyled>
      <div className={ids.includes(file) ? 'active title' : 'title'}>
        {progress < 1 && <Progress type="circle" percent={progress * 100} size={15} />}
        {props.title}
        <Button
          size={'small'}
          variant={'solid'}
          color={'danger'}
          onClick={clickHandler}
          icon={<DeleteOutlined />}
        />
      </div>
      <div className="files">
        {files.map((file) => {
          return <File key={file._id} {...file} />
        })}
      </div>
    </BookStyled>
  )
}
export default observer(Book)
