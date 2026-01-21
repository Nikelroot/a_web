import { makeAutoObservable } from 'mobx'
import apiService from '@/services/apiService'

class UserStore {
  selectedUrl = null
  file = null

  constructor() {
    makeAutoObservable(this)
  }

  setSelected = (url: string) => {
    this.selectedUrl = `https://cdn.nikelroot.ru/cdn/stream/${url}`
  }

  setFile = (id) => {
    console.log('set file')
    this.file = id
  }

  updateTime = (time) => {
    const { updateTime } = apiService
    updateTime({
      fileId: this.file,
      time,
    })
  }
}
const Store = new UserStore()
export default Store
