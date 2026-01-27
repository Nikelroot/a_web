'use client'

import { PlayerStyled } from '@/entries/Player/styles'
import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { observer } from 'mobx-react'
import {
  BookOutlined,
  FastBackwardOutlined,
  FastForwardOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons'
import { timeConvert } from '@/utils/timeConverter'
import { useThrottledUpdateTime } from '@/services/queries'
import Button from '@/shared/Button'
import SeekSlider from '@/entries/Player/SeekLider'
import { useStore } from '@/store/root.context'

const ignorePathNames = ['/login']
type IOSStandaloneNavigator = Navigator & { standalone?: boolean }

const Player = () => {
  const { playerStore } = useStore()
  const ref = useRef<HTMLAudioElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const timeChanging = useRef(false)
  const pathname = usePathname()
  const {
    selectedUrl,
    duration,
    currentTime,
    status,
    loaded,

    setDuration,
    setTime,
    setLoaded,
    setAudio,

    togglePlay,
    play,
    addBookMark,
    loadBookMarks,
  } = playerStore
  const [isStandalone, setIsStandalone] = useState(false)
  const update = useThrottledUpdateTime(5000)

  const timeUpdateHandler = useCallback(() => {
    const el = ref?.current
    if (!el) return

    const time = el.currentTime || 0
    if (!timeChanging.current) {
      playerStore.setTime(time)

      if (time > 0) {
        update({
          fileId: playerStore.file,
          time,
        })
      }
    }
  }, [playerStore, update])

  const durationChangeHandler = useCallback(() => {
    const el = ref?.current
    if (!el) return
    const duration = el.duration
    setDuration(duration)
  }, [setDuration])

  const timeChangeHandler = useCallback(
    (e: number) => {
      timeChanging.current = true
      setTime(Number(e))
    },
    [setTime],
  )

  const timeChangeCompeleHandler = useCallback(
    async (e: number) => {
      const el = ref?.current
      if (!el) return
      // eslint-disable-next-line react-hooks/immutability
      el.currentTime = e
      await play()
      timeUpdateHandler()
      timeChanging.current = false
    },
    [play, timeUpdateHandler],
  )

  const loadingHandler = useCallback(() => {
    setLoaded(true)
    durationChangeHandler()
    loadBookMarks()
  }, [setLoaded, durationChangeHandler])

  const fastSeek = (time: number) => {
    const el = ref?.current
    if (!el) return

    // eslint-disable-next-line react-hooks/immutability
    el.currentTime = el.currentTime + time
  }

  const addBookMarkHandler = () => {
    addBookMark()
  }

  useEffect(() => {
    const calc = () =>
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as IOSStandaloneNavigator).standalone === true

    setIsStandalone(calc())

    const mql = window.matchMedia('(display-mode: standalone)')
    const onChange = () => setIsStandalone(calc())
    mql.addEventListener?.('change', onChange)
    return () => mql.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    if (ref.current) setAudio(ref.current)
  }, [setAudio])

  if (ignorePathNames.includes(pathname)) return null
  return (
    <PlayerStyled $isStandalone={isStandalone}>
      <audio
        ref={ref}
        onTimeUpdate={timeUpdateHandler}
        onDurationChange={durationChangeHandler}
        onLoadedData={loadingHandler}
        controls={true}
        autoPlay={false}
        src={selectedUrl}
      />
      <div className={'controls'}>
        <Button
          ref={buttonRef}
          size={'middle'}
          icon={<FastBackwardOutlined />}
          onClick={() => fastSeek(-15)}
          disabled={!loaded}
        />
        <Button
          size={'large'}
          icon={status ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          onClick={togglePlay}
          disabled={!loaded}
        />
        <Button
          size={'middle'}
          icon={<FastForwardOutlined />}
          onClick={() => fastSeek(15)}
          disabled={!loaded}
        />
      </div>
      <SeekSlider
        duration={duration}
        currentTime={currentTime}
        timeChangeHandler={timeChangeHandler}
        timeChangeCompileHandler={timeChangeCompeleHandler}
      />
      <div className="full" />
      <div className="marks">
        <Button size={'middle'} icon={<BookOutlined />} onClick={addBookMarkHandler} />
      </div>
      <div className="time">
        {timeConvert(currentTime)} / {timeConvert(duration)}
      </div>
    </PlayerStyled>
  )
}
export default observer(Player)
