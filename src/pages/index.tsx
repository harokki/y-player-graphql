import React from 'react'
import { NextPage } from 'next'
import { Grid } from 'semantic-ui-react'

import { YplayerHeader } from '@/components/header'
import { PlaylistMenu } from '@/components/playlist'
import { useGetPlayListQuery } from '@/generated/graphql'

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
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={3}>
            <PlaylistMenu playlist={data ? data.playlist : []} />
          </Grid.Column>
          <Grid.Column>aaa</Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default IndexPage
