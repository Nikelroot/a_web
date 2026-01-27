import { observer } from 'mobx-react'
import { LibraryItemStyled } from '@/entries/Library/styles'
import { Button } from 'antd'
import { IForum } from '@/types/IForum'
import { PlusOutlined } from '@ant-design/icons'
import { useStore } from '@/store/root.context'
import { useCallback } from 'react'

const LibraryItem = (props: IForum) => {
  const { title, _id, inLibrary } = props
  const { libraryStore } = useStore()
  const { addToLibrary, loading } = libraryStore

  const clickAction = useCallback(async () => {
    await addToLibrary(_id)
  }, [_id, addToLibrary])

  return (
    <LibraryItemStyled>
      <div className="title">{title}</div>
      {!inLibrary && (
        <div className="actions">
          <Button
            loading={loading}
            size={'small'}
            icon={<PlusOutlined />}
            onClick={clickAction}
          ></Button>
        </div>
      )}
    </LibraryItemStyled>
  )
}
export default observer(LibraryItem)
