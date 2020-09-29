import React, { useEffect, useState, useRef } from 'react'
import { NextPage } from 'next'
import YouTube, { Options } from 'react-youtube'

import { StartEndForm } from '@/components/form'
import { Setting } from '@/components/setting'
import { YplayerHeader } from '@/components/header'
import { PlayList } from '@/components/playlist'

import styles from './index.module.css'

export type Item = {
  description: string | undefined
  start: number | undefined
  end: number | undefined
  loop: boolean
}

export type PlayListItem = {
  [videoId: string]: Item[]
}

export type PlayerSetting = {
  start: number | undefined
  end: number | undefined
  isLoop: boolean
}

export type PlayerVars = {
  start: number | undefined
  end: number | undefined
}

const initialPlayList: PlayListItem = {
  TruaIGcjaEI: [
    {
      description: '説明1',
      start: 10,
      end: 20,
      loop: true,
    },
    {
      description: '説明2',
      start: 20,
      end: 30,
      loop: true,
    },
  ],
  '2g811Eo7K8U': [
    {
      description: '説明1',
      start: 10,
      end: 20,
      loop: true,
    },
  ],
}

const IndexPage: NextPage = () => {
  const [videoId, setVideoId] = useState<string>('2g811Eo7K8U')
  const [playList, setPlayList] = useState<PlayListItem>(initialPlayList)
  const [items, setItems] = useState<Item[]>(
    playList[videoId] ? playList[videoId] : [],
  )
  const [playerSetting, setPlayerSetting] = useState<PlayerSetting>({
    start: undefined,
    end: undefined,
    isLoop: false,
  })
  const [playerVars, setPlayerVars] = useState<PlayerVars>({
    start: undefined,
    end: undefined,
  })
  const playerRef = useRef<any | undefined>()

  const addPlayList = (
    start: number | undefined,
    end: number | undefined,
    description: string | undefined,
    isLoop: boolean,
  ) => {
    const copyObject = Object.assign({}, playList)
    const newItem = {
      description,
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

  const startVideo = (
    start: number | undefined,
    end: number | undefined,
    isLoop: boolean,
  ) => {
    setPlayerSetting({ start, end, isLoop })
    if (playerRef && playerRef.current) {
      playerRef.current.internalPlayer.playVideo()
    }
  }

  const onEnd = () => {
    if (playerRef && playerRef.current) {
      playerRef.current.internalPlayer.pauseVideo()
      playerRef.current.internalPlayer.seekTo(playerSetting.start)
      if (playerSetting.isLoop) {
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
    playerVars: playerVars,
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
          <PlayList playList={playList} setVideoId={setVideoId} />
        </div>
      </div>
      <div className={styles.mainForm}>
        <StartEndForm
          startVideo={startVideo}
          addPlayList={addPlayList}
          getNowTime={getNowTime}
          setPlayerVars={setPlayerVars}
        />
      </div>
      <div className={styles.settingForm}>
        <Setting items={items} />
      </div>
    </>
  )
}

export default IndexPage
