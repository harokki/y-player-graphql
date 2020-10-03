import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'

import styles from './index.module.css'
import { Playlist } from '@/generated/graphql'

type Props = {
  playList: Playlist[]
  setVideoId: Dispatch<SetStateAction<string>>
  setPlaylistId: Dispatch<SetStateAction<string | undefined>>
}

export const PlayList: React.FC<Props> = ({
  playList,
  setVideoId,
  setPlaylistId,
}) => {
  const router = useRouter()
  const getImg = (videoId: string) => {
    const url = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    return <img src={url} width={168} />
  }

  const setVideo = (videoId: string, playlistId: string) => {
    setVideoId(videoId)
    setPlaylistId(playlistId)
    router.push(`/playlist/${playlistId}/${videoId}`)
  }

  return (
    <div className={styles.img}>
      <span>プレイリスト</span>
      {playList.map((item, i) => (
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
