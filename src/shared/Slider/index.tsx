import { ConfigProvider, Slider as AntSlider } from 'antd'

const Slider = (props) => {
  const theme = {
    components: {
      Slider: {
        // активная дорожка
        trackBg: '#722ed1',
        trackHoverBg: '#722ed1',

        // бегунок
        handleColor: '#722ed1',
        handleActiveColor: '#722ed1',
        handleHoverColor: '#722ed1',

        // обводка бегунка
        handleLineWidth: 2,

        // неактивная дорожка
        railBg: 'rgba(114,46,209,0.25)',
        railHoverBg: 'rgba(114,46,209,0.35)',

        // точки (dots)
        dotActiveBorderColor: '#722ed1',
        dotBorderColor: 'rgba(114,46,209,0.35)',

        // marks
        markTextColor: '#722ed1',
      },
    },
  }
  return (
    <ConfigProvider theme={theme}>
      <AntSlider {...props} />
    </ConfigProvider>
  )
}
export default Slider
