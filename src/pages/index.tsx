import React, { useEffect, useState, useRef } from 'react'
import { NextPage } from 'next'
import YouTube, { Options } from 'react-youtube'

import { StartEndForm } from '@/components/form'
import { SettingForm } from '@/components/form/setting-form'
import { YplayerHeader } from '@/components/header'
import { PlayList } from '@/components/playlist'

import styles from './index.module.css'

export type Item = {
  title: string
  meta: string
  start: number | undefined
  end: number | undefined
  loop: boolean
}

export type PlayListItem = {
  [videoId: string]: Item[]
}

const initialPlayList: PlayListItem = {
  TruaIGcjaEI: [
    {
      title: 'タイトル1',
      meta: 'メタデータ',
      start: 10,
      end: 20,
      loop: true,
    },
    {
      title: 'タイトル2',
      meta: 'メタデータ',
      start: 20,
      end: 30,
      loop: true,
    },
  ],
}

const IndexPage: NextPage = () => {
  const [start, setStart] = useState<number | undefined>(undefined)
  const [end, setEnd] = useState<number | undefined>(undefined)
  const [videoId, setVideoId] = useState<string>('2g811Eo7K8U')
  const [isLoop, setIsLoop] = useState<boolean>(false)
  const [playList, setPlayList] = useState<PlayListItem>(initialPlayList)
  const [items, setItems] = useState<Item[]>(
    playList[videoId] ? playList[videoId] : [],
  )
  const playerRef = useRef<any | undefined>()

  const addPlayList = () => {
    const copyObject = Object.assign({}, playList)
    const newItem = {
      title: 'タイトル2',
      meta: 'メタデータ',
      start,
      end,
      loop: isLoop,
    }
    if (!(videoId in copyObject)) {
      copyObject[videoId] = [newItem]
    } else {
      copyObject[videoId].unshift(newItem)
    }
    setPlayList(copyObject)
  }

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

  const getNowTime = async (): Promise<number | undefined> => {
    if (playerRef && playerRef.current) {
      const nowTime = await playerRef.current.internalPlayer.getCurrentTime()
      return nowTime
    }
  }

  useEffect(() => {
    if (videoId === '') {
      setVideoId('2g811Eo7K8U')
    }
  }, [videoId])

  useEffect(() => {
    setItems(playList[videoId])
  }, [videoId, playList])

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
      <div className={styles.mainForm}>
        <StartEndForm
          start={start}
          setStart={setStart}
          end={end}
          setEnd={setEnd}
          startVideo={startVideo}
          isLoop={isLoop}
          setIsLoop={setIsLoop}
          addPlayList={addPlayList}
          getNowTime={getNowTime}
        />
      </div>
      <div className={styles.settingForm}>
        <SettingForm items={items} />
      </div>
    </>
  )
}

export default IndexPage
