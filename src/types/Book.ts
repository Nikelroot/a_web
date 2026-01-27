import { IForum } from '@/types/IForum'
import { IFile } from '@/types/File'

export interface IBook {
  _id: string
  forum: IForum
  name: string
  files: IFile[]
}
