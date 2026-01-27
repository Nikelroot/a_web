import { makeAutoObservable } from 'mobx'
import RootStore from '@/store/RootStore'
import apiService from '@/services/apiService'

export default class PlayerStore {
  audioRef: HTMLAudioElement | null = null

  file: string | null = null
  selectedUrl: string | null = null

  duration = 0
  currentTime = 0
  status = false
  loaded = false
  autoStarter = false

  constructor(
    private root: RootStore,
    private api: typeof apiService,
  ) {
    makeAutoObservable(this, {}, {})
  }

  setFile = (id: string | null) => {
    this.file = id
  }

  setSelected = (path: string) => {
    this.selectedUrl = `https://cdn.nikelroot.ru/cdn/stream/${path}`
  }

  setDuration = (dur: number) => {
    this.duration = dur
  }
  setTime = (time: number) => {
    this.currentTime = time
  }
  setStatus = (st: boolean) => {
    this.status = st
  }
  setLoaded = (loaded: boolean) => {
    this.loaded = loaded
  }
  setAutostart = (st: boolean) => {
    this.autoStarter = st
  }

  changeBook = async (fileProps: { _id: string; name: string }) => {
    this.loaded = false
    this.setStatus(false)
    const { playHistory } = this.api
    this.file = fileProps._id
    this.setSelected(fileProps.name)
    const { history } = (await playHistory({ fileId: fileProps._id })) || {}
    this.setTime(history?.time || 0)
    this.audioRef.currentTime = history?.time || 0
    await this.audioRef.play()
  }

  setAudio = (el: HTMLAudioElement) => {
    if (!el) return
    this.audioRef = el
  }
}
