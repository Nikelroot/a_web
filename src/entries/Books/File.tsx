import UserStore from '@/store/UserStore'

const File = (props) => {
  const { setSelected, setFile } = UserStore
  const name = props.name.split('/')
  name.shift()

  const clickHandler = () => {
    console.log('click handler', props.name)
    setSelected(props.name)
    setFile(props._id)
  }

  return <div onClick={clickHandler}>{name}</div>
}
export default File
