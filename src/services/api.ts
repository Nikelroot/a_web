import { api } from './axios'
import { Action } from '@/types/Action'

export type GetRoomsParams = {
  search: string | null
}

export type AuthData = {
  username?: string
  password?: string
}

export const searchBooks = async (params: GetRoomsParams) => {
  if (!params.search) return []
  const { data } = await api.post('/forum/search', params)
  return data
}

export const loadBooks = async () => {
  const { data } = await api.get('/books')
  return data
}

export const getHistory = async () => {
  const { data } = await api.get('/user/history')
  return data
}

export const updateTime = async (params: any) => {
  const { data } = await api.put('/user/history', params)
  return data
}

export const addToLibrary = async (params: { action: Action; payload: Record<string, any> }) => {
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
