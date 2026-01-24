'use client'

import { PlayerStyled } from '@/entries/Player/styles'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/dist/client/components/navigation'
import { observer } from 'mobx-react'
import UserStore from '@/store/UserStore'
import apiService from '@/services/apiService'
import { SliderSingleProps } from 'antd'
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
import Slider from '@/shared/Slider'
import SeekSlider from '@/entries/Player/SeekLider'

const ignorePathnames = ['/login']

const Player = () => {
  const ref = useRef<HTMLAudioElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const timeChanging = useRef(false)
  const pathname = usePathname()
  const {
    selectedUrl,
    file,
    setFile,
    setSelected,
    duration,
    currentTime,
    status,
    loaded,
    autoStarter,

    setDuration,
    setTime,
    setStatus,
    setLoaded,
    setAutostart,
  } = UserStore
  const { getLastPlayedFile, playHistory } = apiService
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

  const loadLast = useCallback(() => {
    if (ignorePathnames.includes(pathname)) return
    getLastPlayedFile().then(({ history, file }) => {
      if (file) {
        setFile(file._id)
        setSelected(file.name)
      }
      if (history && history.time) {
        setTime(history.time)
      }
    })
  }, [])

  const loadHistory = useCallback((fileId) => {
    if (ignorePathnames.includes(pathname)) return
    playHistory({ fileId }).then(({ history, file }) => {
      if (file) {
        setFile(file)
        setSelected(file?.name)
      }
      if (history && history.time) {
        setTime(history.time)
      }
    })
  }, [])

  const durationChangeHandler = useCallback(() => {
    const duration = ref.current.duration
    setDuration(duration)
  })

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
    timeChanging.current = false
  }, [])

  const loadingHandler = useCallback(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (ignorePathnames.includes(pathname)) return
    loadLast()
  }, [])

  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === 'visible' && status === false) {
        loadHistory()
      }
    }

    document.addEventListener('visibilitychange', handler)

    return () => {
      document.removeEventListener('visibilitychange', handler)
    }
  }, [status])

  useEffect(() => {
    if (ignorePathnames.includes(pathname)) return
    const el = ref?.current
    if (!el) return
    if (file) {
      el.load()
    }
    playHistory({ fileId: file }).then(({ history }) => {
      if (history) {
        const { time } = history
        // ref.current.currentTime = time
        // play()
        setTime(time)
      }
    })
  }, [loaded, file])

  useEffect(() => {
    const el = ref?.current
    if (!el) return
    if (loaded && currentTime !== null && el.paused && !autoStarter) {
      el.currentTime = currentTime
      play()
      setAutostart(true)
    }
  }, [file, loaded, autoStarter, currentTime])

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
  if (!selectedUrl) return
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
        />
        <Button
          ref={buttonRef}
          size={'large'}
          icon={status ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          onClick={togglePlay}
        />
        <Button
          ref={buttonRef}
          size={'middle'}
          icon={<FastForwardOutlined />}
          onClick={() => fastSeek(15)}
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
