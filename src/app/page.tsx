import Books from '@/entries/Books'
import { Wrap } from '@/global/global'
import Aside from '@/entries/Aside'

const Page = () => {
  return (
    <Wrap className={'container'}>
      <Aside />
      <Books />
    </Wrap>
  )
}
export default Page
