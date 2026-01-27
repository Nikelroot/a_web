import { makeAutoObservable } from 'mobx'
import RootStore from '@/store/RootStore'
import { IForum } from '@/types/IForum'

export default class UserDataStore {
  books: IForum[] = []

  constructor(private root: RootStore) {
    makeAutoObservable(this)
  }

  setBooks = (array) => {
    this.books = array
  }

  get getActiveBook() {
    return (
      this.books.find((book) => {
        return book?.files?.some((f) => f._id === this.root.playerStore.file)
      })?._id || null
    )
  }

  setLastPlayed = (params) => {
    const { file, history } = params
    this.root.playerStore.setFile(file._id)
    this.root.playerStore.setSelected(file.name)
    this.root.playerStore.setTime(history?.time || 0)
    this.root.playerStore.setLocalTime(history?.time || 0)
  }
}
