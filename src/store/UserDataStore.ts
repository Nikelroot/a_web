import { makeAutoObservable, runInAction } from 'mobx'
import apiService from '@/services/apiService'
import RootStore from '@/store/RootStore'

export default class UserDataStore {
  books = []

  isLoading: boolean = false
  removingIds = new Set<string>()

  constructor(
    private root: RootStore,
    private api: typeof apiService,
  ) {
    makeAutoObservable(this)
  }

  loadBooks = async () => {
    this.isLoading = true
    try {
      const data = await this.api.loadBooks()
      runInAction(() => {
        this.books = data?.collection
      })
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  removeBook = async (bookId: string) => {
    if (this.removingIds.has(bookId)) return
    this.removingIds.add(bookId)
    try {
      await this.api.removeFromLibrary({
        action: 'REMOVE_TO_LIBRARY',
        payload: { forumId: bookId },
      })
      await this.loadBooks()
    } finally {
      runInAction(() => {
        this.removingIds.delete(bookId)
      })
    }
  }

  get getActiveBook() {
    return (
      this.books.find((book) => {
        return book?.files?.some((f) => f._id === this.file)
      })?._id || null
    )
  }

  loadLastHistory = async () => {
    const { getLastPlayedFile } = this.api

    const { file, history } = await getLastPlayedFile()
    this.root.playerStore.setFile(file._id)
    this.root.playerStore.setSelected(file.name)
    this.root.playerStore.setTime(history?.time || 0)
    this.root.playerStore.audioRef.currentTime = history?.time || 0
  }
}
