import Slider from '@/shared/Slider'
import { SliderSingleProps } from 'antd'
import { timeConvert } from '@/utils/timeConverter'
import { observer } from 'mobx-react'
import { useStore } from '@/store/root.context'

const SeekSlider = ({ duration, currentTime, timeChangeHandler, timeChangeCompeleHandler }) => {
  const { playerStore } = useStore()

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
export default observer(SeekSlider)
