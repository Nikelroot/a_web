import Slider from '@/shared/Slider'
import { SliderSingleProps } from 'antd'
import { timeConvert } from '@/utils/timeConverter'

const SeekSlider = ({ duration, currentTime, timeChangeHandler, timeChangeCompeleHandler }) => {
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
        onChangeComplete={timeChangeCompeleHandler}
      />
    </div>
  )
}
export default SeekSlider
