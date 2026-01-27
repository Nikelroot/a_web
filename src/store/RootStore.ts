import LibraryStore from '@/store/LibraryStore'
import PlayerStore from '@/store/PlayerStore'
import UserDataStore from '@/store/UserDataStore'
import apiService from '@/services/apiService'
import PaginationStore from '@/store/PaginationStore'

export default class RootStore {
  libraryStore: LibraryStore
  playerStore: PlayerStore
  userStore: UserDataStore
  paginationStore: PaginationStore

  constructor(api: typeof apiService) {
    this.libraryStore = new LibraryStore(this, api)
    this.playerStore = new PlayerStore(this, api)
    this.userStore = new UserDataStore(this, api)
    this.paginationStore = new PaginationStore(this, api)
  }
}
