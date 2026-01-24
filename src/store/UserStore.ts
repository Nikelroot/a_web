import { makeAutoObservable } from 'mobx'
import apiService from '@/services/apiService'

class UserStore {
  selectedUrl = null
  file = null

  duration = 0
  currentTime: number = 0
  status: boolean = false
  loaded: boolean = false
  autoStarter: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  setSelected = (url: string) => {
    this.selectedUrl = `https://cdn.nikelroot.ru/cdn/stream/${url}`
  }

  setFile = (id) => {
    this.file = id
  }

  updateTime = (time) => {
    const { updateTime } = apiService
    updateTime({
      fileId: this.file,
      time,
    })
  }

  setDuration = (duration) => {
    this.duration = duration
  }
  setTime = (currentTime) => {
    this.currentTime = currentTime
  }
  setStatus = (status) => {
    this.status = status
  }
  setLoaded = (loaded) => {
    this.loaded = loaded
  }
  setAutostart = (autoStarter) => {
    this.autoStarter = autoStarter
  }
}
const Store = new UserStore()
export default Store
