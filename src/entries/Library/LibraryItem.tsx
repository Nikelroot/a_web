import { observer } from 'mobx-react'
import { LibraryItemStyled } from '@/entries/Library/styles'
import { Button } from 'antd'
import { Forum } from '@/types/Forum'
import { PlusOutlined } from '@ant-design/icons'
import apiService from '@/services/apiService'

const LibraryItem = (props: Forum) => {
  const { title, _id } = props
  const { addToLibrary } = apiService

  const clickAction = () => {
    addToLibrary({
      action: 'ADD_TO_LIBRARY',
      payload: {
        _id,
      },
    })
  }

  return (
    <LibraryItemStyled>
      <div className="title">{title}</div>
      <div className="actions">
        <Button size={'small'} icon={<PlusOutlined />} onClick={clickAction}></Button>
      </div>
    </LibraryItemStyled>
  )
}
export default observer(LibraryItem)
