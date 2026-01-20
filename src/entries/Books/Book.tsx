import File from './File'

const Book = (props) => {
  const { files } = props
  return (
    <>
      <div>{props.title}</div>
      {files.map((file) => {
        return <File key={file._id} {...file} />
      })}
    </>
  )
}
export default Book
