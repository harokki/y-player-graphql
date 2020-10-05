import React from 'react'
import { NextPage } from 'next'

import { YplayerHeader } from '@/components/header'
import { SideBar } from '@/components/side-bar'

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
  return (
    <>
      <YplayerHeader />
      <SideBar mainForm={null} />
    </>
  )
}

export default IndexPage
