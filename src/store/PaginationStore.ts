import { makeAutoObservable } from 'mobx'
import RootStore from '@/store/RootStore'
import ApiService from '@/services/apiService'

export default class PaginationStore {
  page = 1
  limit = 20

  constructor(
    private root: RootStore,
    private api: typeof ApiService,
  ) {
    makeAutoObservable(this, {})
  }

  setLimit = (limit: number) => {
    this.limit = limit
  }
  setPage = (page: number) => {
    this.page = page
  }
}
