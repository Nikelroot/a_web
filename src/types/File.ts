import { IBook } from '@/types/Book'

export interface IFile {
  _id: string
  name: string
  index: number
  progress: number
  book: IBook
}
