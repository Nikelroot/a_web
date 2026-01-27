import { IFile } from '@/types/File'
import { IUser } from '@/types/User'

export interface IHistory {
  _id: string
  user: IUser
  file: IFile
  time: number
}
