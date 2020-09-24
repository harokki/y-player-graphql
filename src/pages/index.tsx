import React from 'react'
import { NextPage } from 'next'
import YouTube, { Options } from 'react-youtube'

import { StartEndForm } from '@/components/form'
import { YplayerHeader } from '@/components/header'

const IndexPage: NextPage = () => {
  const [start, setStart] = React.useState<number | undefined>(undefined)
  const [end, setEnd] = React.useState<number | undefined>(undefined)
  const opts: Options = {
    height: '390',
    width: '640',
    playerVars: { start, end },
  }
  return (
    <>
      <YplayerHeader />
      <YouTube videoId="2g811Eo7K8U" opts={opts} />
      <StartEndForm setStart={setStart} setEnd={setEnd} />
    </>
  )
}

export default IndexPage
