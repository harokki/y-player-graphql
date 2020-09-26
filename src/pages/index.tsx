import React, { useEffect, useState, useRef } from 'react'
import { NextPage } from 'next'
import YouTube, { Options } from 'react-youtube'

import { StartEndForm } from '@/components/form'
import { YplayerHeader } from '@/components/header'
import { PlayList } from '@/components/playlist'

import styles from './index.module.css'

const playList = [
  {
    videoId: 'TruaIGcjaEI',
    title: 'タイトル1',
    meta: 'メタデータ',
    start: 10,
    end: 20,
    loop: true,
  },
  {
    videoId: 'TruaIGcjaEI',
    title: 'タイトル2',
    meta: 'メタデータ',
    start: 20,
    end: 30,
    loop: true,
  },
  {
    videoId: 'TruaIGcjaEI',
    title: 'タイトル3',
    meta: 'メタデータ',
    start: 30,
    end: 40,
    loop: false,
  },
]

const IndexPage: NextPage = () => {
  const [start, setStart] = useState<number | undefined>(undefined)
  const [end, setEnd] = useState<number | undefined>(undefined)
  const [videoId, setVideoId] = useState<string>('2g811Eo7K8U')
  const [isLoop, setIsLoop] = useState<boolean>(false)
  const playerRef = useRef<any | undefined>()

  const startVideo = () => {
    if (playerRef && playerRef.current) {
      playerRef.current.internalPlayer.playVideo()
    }
  }

  const onEnd = () => {
    if (playerRef && playerRef.current) {
      playerRef.current.internalPlayer.pauseVideo()
      playerRef.current.internalPlayer.seekTo(start)
      if (isLoop) {
        playerRef.current.internalPlayer.playVideo()
      }
    }
  }

  useEffect(() => {
    if (videoId === '') {
      setVideoId('2g811Eo7K8U')
    }
  }, [videoId])

  const opts: Options = {
    height: '390',
    width: '640',
    playerVars: { start, end },
  }

  return (
    <>
      <YplayerHeader setVideoId={setVideoId} />
      <div className={styles.body}>
        <div className={styles.youtube}>
          <YouTube
            videoId={videoId}
            onEnd={onEnd}
            opts={opts}
            ref={playerRef}
          />
          <StartEndForm
            setStart={setStart}
            setEnd={setEnd}
            startVideo={startVideo}
            isLoop={isLoop}
            setIsLoop={setIsLoop}
          />
        </div>
        <div className={styles.playList}>
          <PlayList
            playList={playList}
            setVideoId={setVideoId}
            setStart={setStart}
            setEnd={setEnd}
            setIsLoop={setIsLoop}
          />
        </div>
      </div>
    </>
  )
}

export default IndexPage
