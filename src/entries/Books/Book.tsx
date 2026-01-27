import File from './File'
import { BookStyled } from '@/entries/Books/styles'
import { observer } from 'mobx-react'
import { useCallback, useMemo } from 'react'
import { Button, Progress } from 'antd'
import { DeleteOutlined, ExportOutlined } from '@ant-design/icons'
import { useStore } from '@/store/root.context'

const Book = (props) => {
  const { files = [], progress = 0, _id } = props
  const { playerStore, userStore } = useStore()
  const { removeBook, getActiveBook, isLoading } = userStore
  const { file } = playerStore

  const ids = useMemo(() => {
    return files.map((f) => f._id)
  }, [files])

  const clickHandler = useCallback(() => {
    removeBook(_id)
  }, [_id])

  return (
    <BookStyled>
      <div className={ids.includes(file) ? 'active title' : 'title'}>
        {progress < 1 && <Progress type="circle" percent={progress * 100} size={15} />}

        {props.title}
        <a target={'_blank'} href={props.href}>
          <ExportOutlined />
        </a>
        <Button
          size={'small'}
          variant={'solid'}
          color={'danger'}
          onClick={clickHandler}
          loading={isLoading}
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
