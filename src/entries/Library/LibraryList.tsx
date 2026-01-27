import { Flex } from 'antd'
import LibraryItem from '@/entries/Library/LibraryItem'
import { observer } from 'mobx-react'
import { LibraryListStyled } from '@/entries/Library/styles'
import { useStore } from '@/store/root.context'

const LibraryList = () => {
  const { libraryStore } = useStore()
  return (
    <LibraryListStyled>
      <Flex vertical={true} gap={'1px'}>
        {libraryStore.items.map((item) => (
          <LibraryItem key={item._id} {...item} />
        ))}
      </Flex>
    </LibraryListStyled>
  )
}
export default observer(LibraryList)
