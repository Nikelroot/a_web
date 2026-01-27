import { IFile } from '@/types/File'

export interface IForum {
  _id: string
  title: string
  href: string
  magnet_link: string
  magnet_try: number
  date: string
  cat: string
  progress: number
  lastParse: number
  hasProblem: boolean
  hasLink: boolean
  downloaded: boolean
  inLibrary: boolean
  deleted: boolean
  files: IFile[]
}
