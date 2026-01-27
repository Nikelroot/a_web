'use client'
import { BooksStyled } from '@/entries/Books/styles'
import { useEffect } from 'react'
import BooksList from '@/entries/Books/BooksList'
import { useStore } from '@/store/root.context'
import { useBooksQuery, useLastPlayedFile } from '@/services/queries'

const Books = () => {
  const { userStore } = useStore()
  const { data } = useBooksQuery()
  const { data: lastPlayedData } = useLastPlayedFile()

  useEffect(() => {
    userStore.setBooks(data?.collection)
  }, [userStore, data?.collection])

  useEffect(() => {
    if (!lastPlayedData) return
    userStore.setLastPlayed(lastPlayedData)
  }, [userStore, lastPlayedData])

  return (
    <BooksStyled className={'content'}>
      <BooksList />
    </BooksStyled>
  )
}
export default Books
