import { useRouter } from 'next/router'

import styles from './index.module.css'
import { Playlist } from '@/generated/graphql'

type Props = {
  playlist: Playlist[]
}

export const PlaylistMenu: React.FC<Props> = ({ playlist }) => {
  const router = useRouter()
  const getImg = (videoId: string) => {
    const url = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    return <img src={url} width={168} />
  }

  const setVideo = (videoId: string, playlistId: string) => {
    router.push(`/playlist/${playlistId}/${videoId}`)
  }

  return (
    <div className={styles.img}>
      <span>プレイリスト</span>
      {playlist.map((item, i) => (
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
      ))}
    </div>
  )
}
