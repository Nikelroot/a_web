'use client'
import { BooksStyled } from '@/entries/Books/styles'
import LibraryStore from '@/store/LibraryStore'
import { useEffect } from 'react'
import BooksList from '@/entries/Books/BooksList'

const Books = () => {
  const { loadBooks } = LibraryStore

  useEffect(() => {
    loadBooks()
  }, [])

  return (
    <BooksStyled className={'content'}>
      <BooksList />
    </BooksStyled>
  )
}
export default Books
