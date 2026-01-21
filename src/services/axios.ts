'use client'

import axios from 'axios'
import Cookies from 'universal-cookie'

export const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config

  const cookies = new Cookies()
  const token = cookies.get('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status

    if (typeof window !== 'undefined' && (status === 401 || status === 403)) {
      window.location.replace('/login')
    }

    return Promise.reject(error)
  },
)
