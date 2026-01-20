import { Flex } from 'antd'
import LibraryStore from '@/store/LibraryStore'
import LibraryItem from '@/entries/Library/LibraryItem'
import { observer } from 'mobx-react'
import { LibraryListStyled } from '@/entries/Library/styles'

const LibraryList = () => {
  const { items } = LibraryStore
  return (
    <LibraryListStyled>
      <Flex vertical={true} gap={'1px'}>
        {items.map((item) => (
          <LibraryItem key={item._id} {...item} />
        ))}
      </Flex>
    </LibraryListStyled>
  )
}
export default observer(LibraryList)
