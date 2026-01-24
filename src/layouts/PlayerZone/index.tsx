'use client'

import dynamic from 'next/dynamic'

const Player = dynamic(() => import('@/entries/Player'), { ssr: false })
const PlayerZone = () => {
  return (
    <>
      <Player />
    </>
  )
}
export default PlayerZone
