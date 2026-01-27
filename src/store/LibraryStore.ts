import { makeAutoObservable } from 'mobx'
import { IForum } from '@/types/IForum'
import apiService from '@/services/apiService'
import RootStore from '@/store/RootStore'

export default class LibraryStore {
  items: IForum[] = []
  searchText: string | null = null

  constructor(
    private root: RootStore,
    private api: typeof apiService,
  ) {
    makeAutoObservable(this)
  }

  setItems = (array: IForum[]) => {
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
    const { searchBooks } = this.api
    searchBooks({ search: this.searchText }).then(({ collection }) => {
      this.setItems(collection)
    })
  }
}
