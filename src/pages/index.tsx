import React from 'react'
import { NextPage } from 'next'

import { YplayerHeader } from '@/components/header'
import { PlaylistMenu } from '@/components/playlist'
import { useGetPlayListQuery } from '@/generated/graphql'

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

const IndexPage: NextPage = () => {
  const { loading, error, data } = useGetPlayListQuery()

  if (loading) {
    return <p>loading...</p>
  }
  if (error) {
    return <p>{error.toString()}</p>
  }

  return (
    <>
      <YplayerHeader />
      <div className={styles.playlist}>
        <PlaylistMenu playlist={data ? data.playlist : []} />
      </div>
    </>
  )
}

export default IndexPage
