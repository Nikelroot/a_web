'use client'
import { PlayerStyled } from '@/entries/Player/styles'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/dist/client/components/navigation'
import { observer } from 'mobx-react'
import UserStore from '@/store/UserStore'
import apiService from '@/services/apiService'

const ignorePathnames = ['/login']

const Player = () => {
  const ref = useRef<HTMLAudioElement>(null)
  const pathname = usePathname()
  const { selectedUrl, updateTime, setFile, setSelected } = UserStore
  const { getHistory } = apiService

  const timeUpdateHandler = (e) => {
    const time = ref.current.currentTime
    localStorage.setItem('time', time)
    updateTime(time)
  }

  useEffect(() => {
    if (!ref?.current) return
    ref.current.currentTime = localStorage.getItem('time') || 0
  }, [])

  useEffect(() => {
    if (ignorePathnames.includes(pathname)) return
    getHistory().then(({ history, file }) => {
      setFile(file._id)
      setSelected(file.name)
      setTimeout(() => {
        ref.current.currentTime = history.time
      }, 1000)
    })
  }, [])

  if (ignorePathnames.includes(pathname)) return
  if (!selectedUrl) return

  return (
    <PlayerStyled>
      <audio
        ref={ref}
        onTimeUpdate={timeUpdateHandler}
        controls={true}
        autoPlay={false}
        src={selectedUrl}
      />
    </PlayerStyled>
  )
}
export default observer(Player)
