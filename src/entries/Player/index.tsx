'use client'

import { PlayerStyled } from '@/entries/Player/styles'
import { useCallback, useMemo, useRef } from 'react'
import { usePathname } from 'next/dist/client/components/navigation'
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

const ignorePathnames = ['/login']

const Player = () => {
  const { playerStore } = useStore()
  const ref = useRef<HTMLAudioElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const timeChanging = useRef(false)
  const pathname = usePathname()
  const {
    selectedUrl,
    file,
    duration,
    currentTime,
    status,
    loaded,

    setDuration,
    setTime,
    setStatus,
    setLoaded,
    setAudio,
  } = playerStore
  const update = useThrottledUpdateTime(5000)

  const timeUpdateHandler = useCallback(() => {
    const el = ref?.current
    if (!el) return

    const time = el.currentTime || 0
    if (timeChanging.current === false) {
      setTime(time)

      if (time > 0) {
        update({
          fileId: file,
          time,
        })
      }
    }
  }, [file])

  const durationChangeHandler = useCallback(() => {
    const duration = ref.current.duration
    setDuration(duration)
  }, [])

  const play = useCallback(async () => {
    const el = ref?.current
    if (!el) return
    if (el.paused) {
      try {
        await el.play()
        setStatus(true)
      } catch (err) {
        console.log(err)
      }
    }
  }, [])

  const pause = useCallback(() => {
    const el = ref?.current
    if (!el) return

    el.pause()
    setStatus(false)
  }, [])

  const togglePlay = useCallback(() => {
    if (status) {
      pause()
    } else {
      play()
    }

    const el = buttonRef?.current
    if (!el) return

    el.blur()
  }, [status])

  const timeChangeHandler = useCallback((e: number) => {
    timeChanging.current = true
    setTime(Number(e))
  }, [])

  const timeChangeCompeleHandler = useCallback((e) => {
    const el = ref?.current
    if (!el) return
    el.currentTime = e
    play()
    timeUpdateHandler()
    timeChanging.current = false
  }, [])

  const loadingHandler = useCallback(() => {
    setLoaded(true)
    durationChangeHandler()
  }, [])

  const fastSeek = useCallback((time) => {
    const el = ref?.current
    if (!el) return

    el.currentTime = el.currentTime + time
  }, [])

  const isStandalone = useMemo(() => {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    )
  }, [])

  const addBookMark = useCallback(() => {
    // console.log('addBookMark')
  }, [])

  if (ignorePathnames.includes(pathname)) return
  return (
    <PlayerStyled $isStandalone={isStandalone}>
      <audio
        ref={(_ref) => {
          if (!_ref) return
          setAudio(_ref)
          ref.current = _ref
        }}
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
          ref={buttonRef}
          size={'large'}
          icon={status ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          onClick={togglePlay}
          disabled={!loaded}
        />
        <Button
          ref={buttonRef}
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
        timeChangeCompeleHandler={timeChangeCompeleHandler}
      />
      <div className="full" />
      <div className="marks">
        <Button ref={buttonRef} size={'middle'} icon={<BookOutlined />} onClick={addBookMark} />
      </div>
      <div className="time">
        {timeConvert(currentTime)} / {timeConvert(duration)}
      </div>
    </PlayerStyled>
  )
}
export default observer(Player)
