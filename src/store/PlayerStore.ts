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
  setLocalTime = (time = 0) => {
    const el = this.audioRef
    if (!el) return
    el.currentTime = time
  }
  setStatus = (st: boolean) => {
    this.status = st
  }
  setLoaded = (loaded: boolean) => {
    this.loaded = loaded
  }
  changeBook = async (fileProps: { _id: string; name: string }) => {
    const { playHistory } = this.api

    this.loaded = false
    this.setStatus(false)

    this.file = fileProps._id
    this.setSelected(fileProps.name)
    const { history } = (await playHistory({ fileId: fileProps._id })) || {}
    this.setTime(history?.time || 0)
    this.setLocalTime(history?.time || 0)
    this.play()
  }

  setAudio = (el: HTMLAudioElement) => {
    if (!el) return
    this.audioRef = el
  }

  play = async () => {
    const el = this.audioRef
    if (!el) return

    if (el.paused) {
      try {
        await el.play()
        this.status = true
      } catch (err) {
        console.log(err)
      }
    }
  }
  pause = () => {
    const el = this.audioRef
    if (!el) return

    el.pause()
    this.setStatus(false)
  }

  togglePlay = () => {
    const el = this.audioRef
    if (!el) return
    const status = !el.paused

    if (status) {
      this.pause()
    } else {
      this.play()
    }

    el.blur()
  }
}
