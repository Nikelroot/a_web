'use client'

import { Flex, Input } from 'antd'
import { LibraryStyled } from '@/entries/Library/styles'
import apiService from '@/services/apiService'
import { useCallback, useState } from 'react'
import LibraryStore from '@/store/LibraryStore'
import { observer } from 'mobx-react'
import LibraryList from '@/entries/Library/LibraryList'

const Library = () => {
  const { searchBooks } = apiService
  const { setItems } = LibraryStore
  const [value, setValue] = useState('')

  const changeHandler = useCallback(async (e) => {
    const v = e.target.value

    if (!v || v.length === 0) {
      setValue('')
    } else {
      setValue(v)
      const { collection } = await searchBooks({ search: v })
      setItems(collection)
    }
  }, [])

  return (
    <LibraryStyled>
      <Flex vertical={true} gap={'5px'}>
        <Input placeholder={'Поиск'} onChange={changeHandler} value={value} allowClear={true} />
        <LibraryList />
      </Flex>
    </LibraryStyled>
  )
}
export default observer(Library)
