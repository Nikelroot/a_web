'use client'

import { Flex, Input } from 'antd'
import { LibraryStyled } from '@/entries/Library/styles'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import LibraryList from '@/entries/Library/LibraryList'
import { useStore } from '@/store/root.context'
import { useSearchBooksQuery } from '@/services/queries'

const Library = (props: { className?: string }) => {
  const { libraryStore } = useStore()
  const [value, setValue] = useState('')
  const { data } = useSearchBooksQuery(value)

  const changeHandler = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value

    setValue(v)
  }, [])

  useEffect(() => {
    libraryStore.setItems(data?.collection)
  }, [libraryStore, data?.collection])

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
