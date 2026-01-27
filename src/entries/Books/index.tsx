'use client'
import { BooksStyled } from '@/entries/Books/styles'
import { useEffect } from 'react'
import BooksList from '@/entries/Books/BooksList'
import { useStore } from '@/store/root.context'

const Books = () => {
  const { userStore } = useStore()

  useEffect(() => {
    userStore.loadBooks()
    userStore.loadLastHistory()
  }, [])

  return (
    <BooksStyled className={'content'}>
      <BooksList />
    </BooksStyled>
  )
}
export default Books
