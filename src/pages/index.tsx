import React, { useEffect, useState, useRef } from 'react'
import { NextPage } from 'next'
import YouTube, { Options } from 'react-youtube'

import { StartEndForm } from '@/components/form'
import { YplayerHeader } from '@/components/header'

import styles from './index.module.css'

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
        </div>
        <div className={styles.menu}>
          <label>アコーディオン１</label>
          <input type="checkbox" id="menu_bar01" className="accordion" />
          <ul id="links01">
            <li>
              <a href="">Link01</a>
            </li>
            <li>
              <a href="">Link02</a>
            </li>
            <li>
              <a href="">Link03</a>
            </li>
            <li>
              <a href="">Link04</a>
            </li>
          </ul>
          <label>アコーディオン２</label>
          <input type="checkbox" id="menu_bar02" className="accordion" />
          <ul id="links02">
            <li>
              <a href="">Link01</a>
            </li>
            <li>
              <a href="">Link02</a>
            </li>
            <li>
              <a href="">Link03</a>
            </li>
            <li>
              <a href="">Link04</a>
            </li>
          </ul>
        </div>
      </div>
      <StartEndForm
        setStart={setStart}
        setEnd={setEnd}
        startVideo={startVideo}
        isLoop={isLoop}
        setIsLoop={setIsLoop}
      />
    </>
  )
}

export default IndexPage
