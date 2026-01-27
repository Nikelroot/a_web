import { api } from './axios'
import { TAction } from '@/types/TAction'
import { IBookMark } from '@/types/BookMark'

export type GetRoomsParams = {
  search: string | null
}

export type AuthData = {
  username?: string
  password?: string
}

export const searchBooks = async (params: GetRoomsParams) => {
  const { data } = await api.post('/forum/search', params)
  return data
}

export const loadBooks = async () => {
  const { data } = await api.get('/books')
  return data
}

export const getHistory = async (params) => {
  const { data } = await api.get('/user/history', { params })
  return data
}

export const getLastPlayedFile = async () => {
  const { data } = await api.get('/user/history/last')
  return data
}

export const updateTime = async (params: any) => {
  const { data } = await api.put('/user/history', params)
  return data
}

export const addToLibrary = async (params: { action: TAction; payload: Record<string, any> }) => {
  const { data } = await api.post('/action/book', params)
  return data
}

export const login = async (params: AuthData) => {
  const { data } = await api.post('/auth/login', params)
  return data
}

export const register = async (params: AuthData) => {
  const { data } = await api.post('/auth/register', params)
  return data
}

export const addBookMark = async (params: {
  fileId: string | undefined
  time: number
}): Promise<{
  bookMark: IBookMark
}> => {
  const { data } = await api.post('/user/history/bookMark', params)
  return data
}

export const loadBookMarks = async (params: {
  fileId: string | undefined
}): Promise<{
  bookMarks: IBookMark[]
}> => {
  const { data } = await api.get('/user/history/bookMark', { params })
  return data
}

export const removeFromLibrary = async (params: {
  action: TAction
  payload: Record<string, string | number | boolean>
}) => {
  const { data } = await api.post('/action/book', params)
  return data
}
