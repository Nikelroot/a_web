'use client'
import { PlayerStyled } from '@/entries/Player/styles'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/dist/client/components/navigation'

const ignorePathnames = ['/login']

const Player = () => {
  const ref = useRef<HTMLAudioElement>(null)
  const pathname = usePathname()

  const timeUpdateHandler = (e) => {
    const time = ref.current.currentTime
    localStorage.setItem('time', time)
  }

  useEffect(() => {
    if (!ref?.current) return
    ref.current.currentTime = localStorage.getItem('time') || 0
  }, [])

  if (ignorePathnames.includes(pathname)) return
  return (
    <PlayerStyled>
      <audio
        ref={ref}
        onTimeUpdate={timeUpdateHandler}
        controls={true}
        autoPlay={true}
        src="https://cdn.nikelroot.ru/cdn/stream/p1.m4b"
      />
    </PlayerStyled>
  )
}
export default Player
