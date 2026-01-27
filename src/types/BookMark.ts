import { IUser } from '@/types/User'
import { IFile } from '@/types/File'

export interface IBookMark {
  user: IUser
  time: number
  file: IFile
}
