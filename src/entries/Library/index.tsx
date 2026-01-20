'use client'

import { Flex, Input } from 'antd'
import { LibraryStyled } from '@/entries/Library/styles'
import { ChangeEvent, useCallback, useState } from 'react'
import LibraryStore from '@/store/LibraryStore'
import { observer } from 'mobx-react'
import LibraryList from '@/entries/Library/LibraryList'

const Library = (props: { className?: string }) => {
  const { searchTorrents } = LibraryStore
  const [value, setValue] = useState('')

  const changeHandler = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value

    setValue(v)
    searchTorrents(v)
  }, [])

  return (
    <LibraryStyled className={props?.className || ''}>
      <Flex vertical={true} gap={'5px'}>
        <Input placeholder={'Поиск'} onChange={changeHandler} value={value} allowClear={true} />
        <LibraryList />
      </Flex>
    </LibraryStyled>
  )
}
export default observer(Library)
