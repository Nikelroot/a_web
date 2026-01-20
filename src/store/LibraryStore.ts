import { makeAutoObservable } from 'mobx'
import { Forum } from '@/types/Forum'
import apiService from '@/services/apiService'

class LibraryStore {
  items: Forum[] = []
  books = []
  searchText: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setItems = (array: Forum[]) => {
    this.items = [...array]
  }

  searchTorrents = async (search: string) => {
    this.searchText = search && search.length > 0 ? search : null

    if (this.searchText) {
      this.loadTorrents()
    } else {
      this.items = []
    }
  }

  loadTorrents = () => {
    const { searchBooks } = apiService
    searchBooks({ search: this.searchText }).then(({ collection }) => {
      this.setItems(collection)
    })
  }

  loadBooks = () => {
    const { loadBooks } = apiService

    loadBooks().then(({ collection }) => {
      this.books = collection
    })
  }
}
const Store = new LibraryStore()
export default Store
