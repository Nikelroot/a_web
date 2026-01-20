'use client'

import axios, { AxiosInstance, AxiosResponse } from 'axios'
import Cookies from 'universal-cookie'
import { Action } from '@/types/Action'

export type GetRoomsParams = {
  search: string
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
    return instance.post('/forum/search', params).then(convertData)
  }

  addToLibrary = async (params: { action: Action; payload: Record<string, any> }) => {
    return instance.post('/actions/book', params).then(convertData)
  }
}

const apiService = new ApiService()
export default apiService
