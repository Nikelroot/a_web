import Slider from '@/shared/Slider'
import { SliderSingleProps } from 'antd'
import { timeConvert } from '@/utils/timeConverter'

interface Props {
  duration: number
  currentTime: number
  timeChangeHandler: (time: number) => void
  timeChangeCompileHandler: (time: number) => void
}
const SeekSlider = (props: Props) => {
  const { duration, currentTime, timeChangeHandler, timeChangeCompileHandler } = props

  const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (value) => {
    return timeConvert(value)
  }
  return (
    <div className="slider">
      <Slider
        max={duration}
        value={currentTime}
        tooltip={{ formatter }}
        onChange={timeChangeHandler}
        onChangeComplete={timeChangeCompileHandler}
      />
    </div>
  )
}
export default SeekSlider
