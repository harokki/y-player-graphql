import React, { useEffect, useState, useRef } from 'react'
import { NextPage } from 'next'
import YouTube, { Options } from 'react-youtube'

import { MainForm } from '@/components/form'
import { SettingTable } from '@/components/setting'
import { YplayerHeader } from '@/components/header'
import { PlayList } from '@/components/playlist'
import { useGetPlayListQuery, useGetSettingQuery } from '@/generated/graphql'

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

export type YoutubeSetting = {
  onEndSetting: PlayerSetting
  playerVars: PlayerVars
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
  const [playlistId, setPlaylistId] = useState<string | undefined>(undefined)
  const [playList, setPlayList] = useState<PlayListItem>(initialPlayList)
  const [youtubeSetting, setYoutubeSetting] = useState<YoutubeSetting>({
    onEndSetting: { start: undefined, end: undefined, isLoop: false },
    playerVars: { start: undefined, end: undefined },
  })
  const playerRef = useRef<any | undefined>()
  const { loading, error, data } = useGetPlayListQuery()
  const {
    loading: loadingS,
    error: errorS,
    data: dataS,
    refetch,
  } = useGetSettingQuery({
    variables: { playlistId: playlistId as string },
  })

  const startVideo = () => {
    if (playerRef && playerRef.current) {
      playerRef.current.internalPlayer.playVideo()
    }
  }

  const onEnd = () => {
    if (playerRef && playerRef.current) {
      playerRef.current.internalPlayer.pauseVideo()
      playerRef.current.internalPlayer.seekTo(youtubeSetting.onEndSetting.start)
      if (youtubeSetting.onEndSetting.isLoop) {
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

  const updatePlayList = (
    index: number,
    name: string,
    value: string | boolean,
  ) => {
    const copiedItems = playList[videoId].slice()
    copiedItems[index] = { ...copiedItems[index], [name]: value }
    const copiedPlayList = Object.assign({}, playList)
    copiedPlayList[videoId] = copiedItems
    setPlayList(copiedPlayList)
  }

  // 検索フォームが空になった時にデフォルトのビデオIDをセットする
  useEffect(() => {
    if (videoId === '') {
      setVideoId('2g811Eo7K8U')
    }
  }, [videoId])

  const opts: Options = {
    height: '390',
    width: '640',
    playerVars: youtubeSetting.playerVars,
  }

  const getMainForm = () => {
    if (!playlistId) {
      return null
    }
    if (errorS) {
      return <p>{errorS.toString()}</p>
    }
    return (
      <MainForm
        refetch={refetch}
        playlistId={playlistId}
        startVideo={startVideo}
        getNowTime={getNowTime}
        setYoutubeSetting={setYoutubeSetting}
      />
    )
  }

  if (loading || loadingS) {
    return <p>loading...</p>
  }
  if (error) {
    return <p>{error.toString()}</p>
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
            playList={data ? data.playlist : []}
            setVideoId={setVideoId}
            setPlaylistId={setPlaylistId}
          />
        </div>
      </div>
      <div className={styles.mainForm}>{getMainForm()}</div>
      <div className={styles.settingForm}>
        {dataS && dataS.setting ? (
          <SettingTable
            data={dataS.setting}
            updatePlayList={updatePlayList}
            startVideo={startVideo}
            setYoutubeSetting={setYoutubeSetting}
          />
        ) : null}
      </div>
    </>
  )
}

export default IndexPage
