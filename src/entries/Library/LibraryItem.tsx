import { observer } from 'mobx-react'
import { LibraryItemStyled } from '@/entries/Library/styles'
import { Button } from 'antd'
import { Forum } from '@/types/Forum'
import { PlusOutlined } from '@ant-design/icons'
import apiService from '@/services/apiService'
import LibraryStore from '@/store/LibraryStore'

const LibraryItem = (props: Forum) => {
  const { title, _id, inLibrary } = props
  const { addToLibrary } = apiService
  const { loadTorrents } = LibraryStore

  const clickAction = () => {
    addToLibrary({
      action: 'ADD_TO_LIBRARY',
      payload: {
        forumId: _id,
      },
    }).then(loadTorrents)
  }

  return (
    <LibraryItemStyled>
      <div className="title">{title}</div>
      {!inLibrary && (
        <div className="actions">
          <Button size={'small'} icon={<PlusOutlined />} onClick={clickAction}></Button>
        </div>
      )}
    </LibraryItemStyled>
  )
}
export default observer(LibraryItem)
