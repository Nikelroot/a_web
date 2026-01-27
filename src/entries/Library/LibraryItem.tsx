import { observer } from 'mobx-react'
import { LibraryItemStyled } from '@/entries/Library/styles'
import { Button } from 'antd'
import { IForum } from '@/types/IForum'
import { PlusOutlined } from '@ant-design/icons'
import { useCallback } from 'react'
import { useAddToLibraryMutation } from '@/services/queries'

const LibraryItem = (props: IForum) => {
  const { title, _id, inLibrary } = props
  const { mutate: addToLibrary, isPending } = useAddToLibraryMutation()

  const clickAction = useCallback(async () => {
    addToLibrary({
      action: 'ADD_TO_LIBRARY',
      payload: {
        forumId: _id,
      },
    })
  }, [_id, addToLibrary])

  return (
    <LibraryItemStyled>
      <div className="title">{title}</div>
      {!inLibrary && (
        <div className="actions">
          <Button
            loading={isPending}
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
