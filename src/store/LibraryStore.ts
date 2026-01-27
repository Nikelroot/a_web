import { makeAutoObservable } from 'mobx'
import { IForum } from '@/types/IForum'
import RootStore from '@/store/RootStore'

export default class LibraryStore {
  items: IForum[] = []

  constructor(private root: RootStore) {
    makeAutoObservable(this)
  }

  setItems = (array: IForum[] = []) => {
    this.items = [...array]
  }
}
