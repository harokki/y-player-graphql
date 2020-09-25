import React from 'react'
import { NextPage } from 'next'
import YouTube, { Options } from 'react-youtube'

import { StartEndForm } from '@/components/form'
import { YplayerHeader } from '@/components/header'

const IndexPage: NextPage = () => {
  const [start, setStart] = React.useState<number | undefined>(undefined)
  const [end, setEnd] = React.useState<number | undefined>(undefined)
  const playerRef = React.useRef<any | undefined>()

  const startVideo = () => {
    if (playerRef && playerRef.current) {
      playerRef.current.internalPlayer.playVideo()
    }
  }

  const onEnd = () => {
    if (playerRef && playerRef.current) {
      playerRef.current.internalPlayer.pauseVideo()
      playerRef.current.internalPlayer.seekTo(start)
    }
  }

  const opts: Options = {
    height: '390',
    width: '640',
    playerVars: { start, end },
  }

  return (
    <>
      <YplayerHeader />
      <YouTube
        videoId="2g811Eo7K8U"
        onEnd={onEnd}
        opts={opts}
        ref={playerRef}
      />
      <StartEndForm
        setStart={setStart}
        setEnd={setEnd}
        startVideo={startVideo}
      />
    </>
  )
}

export default IndexPage
