import { useRouter } from 'next/router'
import { Menu } from 'semantic-ui-react'

import styles from './index.module.css'
import { useGetPlayListQuery } from '@/generated/graphql'

export const PlaylistMenu: React.FC = () => {
  const { loading, error, data } = useGetPlayListQuery()
  const router = useRouter()
  const getImg = (videoId: string) => {
    const url = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    return <img src={url} width={168} />
  }

  const setVideo = (videoId: string, playlistId: string) => {
    router.push(`/playlist/${playlistId}/${videoId}`)
  }

  if (loading) {
    return <p>loading...</p>
  }
  if (error) {
    return <p>{error.toString()}</p>
  }

  const playlist = data ? data.playlist : []

  return (
    <div className={styles.img}>
      <Menu.Item>
        <Menu.Header>プレイリスト</Menu.Header>
        {playlist.map((item, i) => (
          <Menu.Item key={i}>
            <div
              key={i}
              className={styles.box}
              onClick={() => setVideo(item.videoId, item.id)}
            >
              <div className={styles.boxImg}>{getImg(item.videoId)}</div>
              <div className={styles.boxText}>
                <span>{item.title}</span>
              </div>
            </div>
          </Menu.Item>
        ))}
      </Menu.Item>
    </div>
  )
}
