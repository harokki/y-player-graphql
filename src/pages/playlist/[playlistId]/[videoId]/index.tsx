import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useRef } from 'react'
import YouTube, { Options } from 'react-youtube'
import { useGetSettingQuery } from '@/generated/graphql'

import { YplayerHeader } from '@/components/header'
import { SettingTable } from '@/components/setting'
import { MainForm } from '@/components/form'
import { SideBar } from '@/components/side-bar'
import { DissmissibleMessage } from '@/components/message'

import styles from './index.module.css'

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

const Playlist: NextPage = () => {
  const router = useRouter()
  const { playlistId, videoId } = router.query
  const [youtubeSetting, setYoutubeSetting] = useState<YoutubeSetting>({
    onEndSetting: { start: undefined, end: undefined, isLoop: false },
    playerVars: { start: undefined, end: undefined },
  })
  const playerRef = useRef<any | undefined>()
  const { loading, error, data, refetch } = useGetSettingQuery({
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

  const getMainForm = () => {
    if (!playlistId) {
      return null
    }
    return (
      <MainForm
        refetch={refetch}
        playlistId={playlistId as string}
        startVideo={startVideo}
        getNowTime={getNowTime}
        setYoutubeSetting={setYoutubeSetting}
      />
    )
  }

  const opts: Options = {
    height: '390',
    width: '640',
    playerVars: youtubeSetting.playerVars,
  }

  if (loading) {
    return <p>loading...</p>
  }
  if (error) {
    return <p>{error.toString()}</p>
  }

  return (
    <>
      <YplayerHeader />
      <SideBar mainForm={getMainForm()} />
      <div className={styles.main}>
        <YouTube
          videoId={videoId as string}
          onEnd={onEnd}
          opts={opts}
          ref={playerRef}
        />
        {data && data.setting ? (
          <SettingTable
            data={data.setting}
            startVideo={startVideo}
            setYoutubeSetting={setYoutubeSetting}
          />
        ) : null}
      </div>
      <DissmissibleMessage />
    </>
  )
}

export default Playlist
