import { makeAutoObservable } from 'mobx'
import RootStore from '@/store/RootStore'
import apiService from '@/services/apiService'
import { IBookMark } from '@/types/BookMark'
import { IFile } from '@/types/File'
import { IHistory } from '@/types/History'

export default class PlayerStore {
  audioRef: HTMLAudioElement | null = null

  file: string | undefined = undefined
  selectedUrl: string | undefined = undefined

  duration = 0
  currentTime = 0
  status = false
  loaded = false
  bookMarks: IBookMark[] = []

  constructor(
    private root: RootStore,
    private api: typeof apiService,
  ) {
    makeAutoObservable(this, {}, {})
  }

  setFile = (id: string | undefined) => {
    console.log('setFile', id)
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
  changeBook = (params: { file: IFile; history: IHistory }) => {
    const { file, history } = params || {}
    this.setStatus(false)

    this.file = file?._id
    this.setSelected(file?.name)
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

    if (el.currentTime === 0 && this.currentTime !== 0) {
      el.currentTime = this.currentTime
    }

    if (el.paused) {
      try {
        await el.play()
        this.status = true
      } catch (err) {
        console.warn(err)
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
    const status = el.paused

    if (status) {
      this.play()
    } else {
      this.pause()
    }

    el.blur()
  }
}
