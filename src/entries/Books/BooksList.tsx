import { observer } from 'mobx-react'
import Book from '@/entries/Books/Book'
import { BooksListStyled } from '@/entries/Books/styles'
import { useStore } from '@/store/root.context'

const BooksList = () => {
  const { userStore } = useStore()

  return (
    <BooksListStyled>
      {userStore?.books?.map((book) => {
        return <Book key={book._id} {...book} />
      })}
    </BooksListStyled>
  )
}
export default observer(BooksList)
