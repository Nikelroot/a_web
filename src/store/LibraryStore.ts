import { makeAutoObservable } from 'mobx'
import { Forum } from '@/types/Forum'

class LibraryStore {
  items: Forum[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setItems = (array: Forum[]) => {
    this.items = [...array]
  }
}
const Store = new LibraryStore()
export default Store
