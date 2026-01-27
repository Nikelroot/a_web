import Slider from '@/shared/Slider'
import { SliderSingleProps } from 'antd'
import { timeConvert } from '@/utils/timeConverter'
import { useStore } from '@/store/root.context'
import { observer } from 'mobx-react'
import { useMemo } from 'react'

interface Props {
  duration: number
  currentTime: number
  timeChangeHandler: (time: number) => void
  timeChangeCompileHandler: (time: number) => void
}
const SeekSlider = (props: Props) => {
  const { duration, currentTime, timeChangeHandler, timeChangeCompileHandler } = props
  const { playerStore } = useStore()
  const { bookMarks } = playerStore

  const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (value) => {
    return timeConvert(value)
  }

  const marks: SliderSingleProps['marks'] = useMemo(() => {
    return bookMarks.reduce((acc, item, index) => {
      return { ...acc, [item.time]: index }
    }, {})
  }, [bookMarks])

  return (
    <div className="slider">
      <Slider
        marks={marks}
        max={duration}
        value={currentTime}
        tooltip={{ formatter }}
        onChange={timeChangeHandler}
        onChangeComplete={timeChangeCompileHandler}
      />
    </div>
  )
}
export default observer(SeekSlider)
