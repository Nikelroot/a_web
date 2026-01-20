import { observer } from 'mobx-react'
import LibraryStore from '@/store/LibraryStore'
import Book from '@/entries/Books/Book'

const BooksList = () => {
  const { books } = LibraryStore

  return (
    <>
      {books.map((book) => {
        return <Book key={book._id} {...book} />
      })}
    </>
  )
}
export default observer(BooksList)
