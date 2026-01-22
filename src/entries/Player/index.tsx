'use client'
import { PlayerStyled } from '@/entries/Player/styles'
import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/dist/client/components/navigation'
import { observer } from 'mobx-react'
import UserStore from '@/store/UserStore'
import apiService from '@/services/apiService'
import { Flex, Slider, SliderSingleProps } from 'antd'
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { timeConvert } from '@/utils/timeConverter'
import { useThrottledUpdateTime } from '@/services/queries'
import Button from '@/shared/Button'

const ignorePathnames = ['/login']

const Player = () => {
  const ref = useRef<HTMLAudioElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const timeChanging = useRef(false)
  const pathname = usePathname()
  const { selectedUrl, file, setFile, setSelected } = UserStore
  const { getHistory } = apiService
  const [duration, setDuration] = useState(0)
  const [currentTime, setTime] = useState(0)
  const [status, setStatus] = useState(false)
  const update = useThrottledUpdateTime(5000)
  const [loaded, setLoaded] = useState(false)
  const [autoStarter, setAutostart] = useState(false)

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

  const loadHistory = useCallback(() => {
    if (ignorePathnames.includes(pathname)) return
    getHistory().then(({ history, file }) => {
      setFile(file._id)
      setSelected(file.name)
      setTime(history.time)
    })
  }, [])

  const durationChangeHandler = useCallback(() => {
    const duration = ref.current.duration
    setDuration(() => duration)
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

  const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (value) => {
    return timeConvert(value)
  }

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
    console.log('loaded')
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (ignorePathnames.includes(pathname)) return
    loadHistory()
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
    getHistory({ fileId: file }).then(({ history }) => {
      if (history) {
        const { time } = history
        // ref.current.currentTime = time
        // play()
        setTime(time)
      }
    })
  }, [file])

  useEffect(() => {
    const el = ref?.current
    if (!el) return
    if (loaded && currentTime !== null && el.paused && !autoStarter) {
      el.currentTime = currentTime
      play()
      setAutostart(true)
    }
  }, [loaded, autoStarter, currentTime])

  if (ignorePathnames.includes(pathname)) return
  if (!selectedUrl) return
  return (
    <PlayerStyled>
      <audio
        ref={ref}
        onTimeUpdate={timeUpdateHandler}
        onDurationChange={durationChangeHandler}
        onLoadedData={loadingHandler}
        controls={true}
        autoPlay={false}
        src={selectedUrl}
      />
      <Flex align={'center'} gap={'10px'}>
        <Button
          ref={buttonRef}
          size={'middle'}
          icon={status ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          onClick={togglePlay}
        />

        <div className="slider">
          <Slider
            max={duration}
            value={currentTime}
            tooltip={{ formatter }}
            onChange={timeChangeHandler}
            onChangeComplete={timeChangeCompeleHandler}
          />
        </div>
        <div className="time">
          <span>{timeConvert(currentTime)}</span> <span className={'small'}>/</span>{' '}
          <span>{timeConvert(duration)}</span>
        </div>
      </Flex>
    </PlayerStyled>
  )
}
export default observer(Player)
