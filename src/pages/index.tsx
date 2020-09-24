import { NextPage } from 'next'
import YouTube, { Options } from 'react-youtube'

import { StartEndForm } from '@/components/form'
import { YplayerHeader } from '@/components/header'

const IndexPage: NextPage = () => {
  const opts: Options = {
    height: '390',
    width: '640',
    playerVars: { start: 5, end: 10 },
  }
  return (
    <>
      <YplayerHeader />
      <YouTube videoId="2g811Eo7K8U" opts={opts} />
      <StartEndForm />
    </>
  )
}

export default IndexPage
