import { observer } from 'mobx-react'
import LibraryStore from '@/store/LibraryStore'
import Book from '@/entries/Books/Book'
import { BooksListStyled } from '@/entries/Books/styles'

const BooksList = () => {
  const { books } = LibraryStore

  return (
    <BooksListStyled>
      {books.map((book) => {
        return <Book key={book._id} {...book} />
      })}
    </BooksListStyled>
  )
}
export default observer(BooksList)
