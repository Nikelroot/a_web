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
  loadBookMarks,
  getLastPlayedFile,
  addBookMark,
  removeFromLibrary,
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
    queryKey: ['search', search],
    queryFn: () => searchBooks({ search }),
    // enabled: !!search,
  })

export const useHistoryQuery = (fileId) =>
  useQuery({
    queryKey: ['fileHistory', fileId],
    queryFn: () => getHistory({ fileId }),
    refetchOnWindowFocus: false,
  })

export const useLastPlayedFile = () =>
  useQuery({
    queryKey: ['lastPlayed'],
    queryFn: getLastPlayedFile,
    refetchOnWindowFocus: false,
  })

export const useBookMarkQuery = (fileId: string | undefined) =>
  useQuery({
    queryKey: ['bookMarks', fileId],
    queryFn: () => loadBookMarks({ fileId }),
    enabled: !!fileId,
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

  useEffect(
    () => () => {
      return throttled?.cancel && throttled!.cancel()
    },
    [throttled],
  )

  return throttled // есть .flush() и .cancel()
}

export const useAddToLibraryMutation = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: addToLibrary,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['search'] })
    },
  })
}

export const ussAddBookMarkMutation = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: addBookMark,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['bookMarks'] })
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

export const useRemoveBookMutation = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: removeFromLibrary,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['books'] })
    },
  })
}
