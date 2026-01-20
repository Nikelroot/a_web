'use client'

import axios, { AxiosInstance, AxiosResponse } from 'axios'
import Cookies from 'universal-cookie'
import { Action } from '@/types/Action'

export type GetRoomsParams = {
  search: string | null
}

export type AuthData = {
  username?: string
  password?: string
}

const instance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config) => {
    if (typeof window === 'undefined') {
      return config
    }
    const cookies = new Cookies()
    const token = cookies.get('token')
    if (token) {
      ;(config.headers as Record<string, unknown>)['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

instance.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    const status =
      (error as { status?: number })?.status ??
      (
        error as {
          response?: { status?: number }
        }
      )?.response?.status

    if (typeof window !== 'undefined' && (status === 403 || status === 401)) {
      window.location.replace('/login')
    }
    return Promise.reject(error)
  },
)

function convertData<T>(resp: AxiosResponse<T>): T {
  return resp.data
}

class ApiService {
  constructor() {}

  searchBooks = async (params: GetRoomsParams) => {
    if (!params.search) return
    return instance.post('/forum/search', params).then(convertData)
  }

  loadBooks = async () => {
    return instance.get('/books').then(convertData)
  }

  updateTime = async (params) => {
    return instance.put('/user/history', params).then(convertData)
  }

  getHistory = async () => {
    return instance.get('/user/history').then(convertData)
  }

  addToLibrary = async (params: { action: Action; payload: Record<string, any> }) => {
    return instance.post('/action/book', params).then(convertData)
  }

  login = async (params: AuthData) => {
    return instance.post('/auth/login', params).then(convertData)
  }

  register = async (params: AuthData) => {
    return instance.post('/auth/register', params).then(convertData)
  }
}

const apiService = new ApiService()
export default apiService
