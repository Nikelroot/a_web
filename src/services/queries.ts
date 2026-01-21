'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  searchBooks,
  loadBooks,
  getHistory,
  updateTime,
  addToLibrary,
  login,
  register,
} from './api'
import { useEffect, useMemo } from 'react'
import { throttle } from '@tanstack/pacer'

/* ---------- queries ---------- */

export const useBooksQuery = () =>
  useQuery({
    queryKey: ['books'],
    queryFn: loadBooks,
  })

export const useSearchBooksQuery = (search: string | null) =>
  useQuery({
    queryKey: ['books', 'search', search],
    queryFn: () => searchBooks({ search }),
    enabled: !!search,
  })

export const useHistoryQuery = () =>
  useQuery({
    queryKey: ['history'],
    queryFn: getHistory,
  })

/* ---------- mutations ---------- */

export const useUpdateTimeMutation = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: updateTime,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['history'] })
    },
  })
}

export function useThrottledUpdateTime(wait = 3000) {
  const { mutate } = useUpdateTimeMutation()

  const throttled = useMemo(
    () =>
      throttle(
        (payload: UpdateTimePayload) => {
          mutate(payload)
        },
        { wait, leading: true, trailing: true },
      ),
    [mutate, wait],
  )

  useEffect(() => () => throttled.cancel(), [throttled])

  return throttled // есть .flush() и .cancel()
}

export const useAddToLibraryMutation = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: addToLibrary,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['books'] })
    },
  })
}

export const useLoginMutation = () =>
  useMutation({
    mutationFn: login,
  })

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: register,
  })
