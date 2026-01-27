import File from './File'
import { BookStyled } from '@/entries/Books/styles'
import { observer } from 'mobx-react'
import { useCallback } from 'react'
import { Button } from 'antd'
import { DeleteOutlined, ExportOutlined } from '@ant-design/icons'
import { useStore } from '@/store/root.context'
import { IForum } from '@/types/IForum'
import { useRemoveBookMutation } from '@/services/queries'

const Book = (props: IForum) => {
  const { files = [], _id } = props
  const { userStore } = useStore()
  const { getActiveBook } = userStore
  const { mutate: removeBook, isPending } = useRemoveBookMutation()

  const clickHandler = useCallback(() => {
    removeBook({
      action: 'REMOVE_TO_LIBRARY',
      payload: { forumId: _id },
    })
  }, [_id, removeBook])

  return (
    <BookStyled>
      <div className={getActiveBook === _id ? 'active title' : 'title'}>
        {props.title}
        <a target={'_blank'} href={props.href}>
          <ExportOutlined />
        </a>
        <Button
          size={'small'}
          variant={'solid'}
          color={'danger'}
          onClick={clickHandler}
          loading={isPending}
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
